"use server"
import { Octokit } from "octokit"
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods"
import { retry } from "@octokit/plugin-retry"
import { Agent } from "node:http"

const OWNER = process.env.GITHUB_USERNAME!
const REPO = process.env.GITHUB_REPO_NAME!

const MyOctokit = Octokit.plugin(retry)
const octokit = new MyOctokit({ auth: process.env.GITHUB_TOKEN })

export type ActionResponse<T> =
  | { success: true; data: T; status: number; error?: never }
  | { success: false; data?: never; status?: number; error: string }

// Octokit Data types for positing to repos and returning data field from result
type FileCommitData =
  RestEndpointMethodTypes["repos"]["createOrUpdateFileContents"]["response"]["data"]

export async function verifyGithubSession(): Promise<ActionResponse<string>> {
  try {
    const {
      data: { login }
    } = await octokit.rest.users.getAuthenticated({
      request: {
        retries: 2,
        retryAfter: 1
      }
    })
    return { success: true, data: login, status: 200 }
  } catch (e: any) {
    console.error("Auth Error:", e.message)
    return { success: false, error: e.message, status: e.status || 500 }
  }
}

// Push post to _posts directory
export async function uploadPostToGithub(
  slug: string,
  content: string,
  message: string
): Promise<ActionResponse<FileCommitData>> {
  const path = `_posts/${slug}.md`
  let sha: string | undefined
  // Check for existing file to get SHA
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path
    })
    if (!Array.isArray(data)) sha = data.sha
  } catch (e) {
    // 404 is expected for new posts
  }

  try {
    const res = await octokit.rest.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path,
      message,
      content: Buffer.from(content).toString("base64"),
      sha
    })
    return { success: true, data: res.data, status: res.status }
  } catch (e: any) {
    return { success: false, error: e.message, status: e.status }
  }
}

// Push images to /public/assets/blog/${postTitle} directory
export async function uploadImageToGithub(
  postTitle: string,
  fileName: string,
  base64Data: string
): Promise<ActionResponse<FileCommitData>> {
  const path = `public/assets/blog/${postTitle}/${fileName}`
  try {
    const res = await octokit.rest.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path,
      message: `Upload image: ${fileName}`,
      content: base64Data,
      // Add a higher timeout for large image uploads
      request: {
        agent: new Agent({ keepAlive: true }),
        timeout: 30000 // 30 seconds
      }
    })
    return { success: true, data: res.data, status: res.status }
  } catch (e: any) {
    // Catch 422 (Conflict/Validation) specifically if needed
    console.error("Upload failed:", e.message)
    const msg = e.status === 422 ? "Image already exists." : e.message
    return { success: false, error: msg, status: e.status }
  }
}
