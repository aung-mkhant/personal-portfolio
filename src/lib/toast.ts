import toast from "react-hot-toast"

export function showToast() {
  return () =>
    toast("Hello World", {
      duration: 4000,
      position: "bottom-right",

      // Styling
      style: {},
      className: "",

      // Custom Icon
      icon: "👏",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#000",
        secondary: "#fff"
      },

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite"
      },

      // Additional Configuration
      removeDelay: 1000,

      // Toaster instance
      toasterId: "default"
    })
}
