import Swal from "sweetalert2";

interface SwalValues {
  title: string;
  text: string;
  icon: "success" | "error" | "info" | "warning" | "question";
  confirmButtonText?: string;
  confirmButtonColor?: string; // hex color
  cancelButtonText?: string;
}

const showSwal = async ({
  title,
  text,
  icon,
  confirmButtonText,
  confirmButtonColor = "#37901e",
  cancelButtonText,
}: SwalValues) => {
  return await Swal.fire({
    title,
    text,
    icon,
    timer: confirmButtonText ? 6000 : 3000,
    showCancelButton: cancelButtonText ? true : false,
    showConfirmButton: confirmButtonText ? true : false,
    confirmButtonColor,
    cancelButtonColor: "#d33",
    confirmButtonText,
    cancelButtonText,
  });
};

export default showSwal;
