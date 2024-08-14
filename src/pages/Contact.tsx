import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContactFormField } from "../features/contactSlice";
import { RootState } from "../app/store";
import { contactFormInputs } from ".././helper/constants";
import { CircleLoader } from "react-spinners";
import useFeedback from "../hooks/useFeedback";
import { toastWarnNotify } from "../helper/toastNotify";
import CustomImage from "../utils/CustomImage";
import setups from "../helper/setup";

const Contact = () => {
  const dispatch = useDispatch();
  const { form, loading } = useSelector((state: RootState) => state.contact);
  const { sendFeedback } = useFeedback();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // console.log(`Setting ${name} to ${value}`); // Log to check state updates
    dispatch(setContactFormField({ field: name, value }));
  };

  // console.log(form);

  const handleSendFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Form submitted"); // Log to check form submit
    const { name, email, feedback } = form;

    if (name && email && feedback) {
      await sendFeedback();
    } else {
      toastWarnNotify("Please fill the contact form!");
    }
  };

  return (
    <>
      <div className="bg-[#e5effd] font-[sans-serif] page-height px-8 md:p-0 grid md:place-content-center md:place-items-center">
        <div className="grid lg:grid-cols-3 md:gap-10 items-center max-lg:justify-center h-full sm:p-10 max-sm:p-4">
          <div className="max-w-xl max-lg:mx-auto max-lg:text-center max-lg:mb-6 2xl:ms-10 mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center lg:text-left">
              Get In Touch
            </h2>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed text-center lg:text-left">
              If you have any questions, feedback, or need assistance, please
              feel free to reach out to us by filling out the form below. We
              look forward to hearing from you!
            </p>

            <form
              onSubmit={handleSendFeedback}
              className="mx-auto mt-4 bg-white rounded-lg p-4 shadow-md space-y-4"
            >
              {contactFormInputs.map(({ name, label, type }) => (
                <FormInput
                  key={name}
                  label={label}
                  type={type}
                  name={name}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                />
              ))}
              <textarea
                name="feedback"
                placeholder="Message"
                value={form.feedback}
                onChange={handleChange}
                className="w-full px-4 pt-3 bg-[#f0f1f2] rounded-md outline-none text-[10px] md:text-[14px] text-black/60"
                rows={6}
                required
              ></textarea>
              <button
                type="submit"
                className="text-gray-800 bg-[#b9d0f0] hover:bg-[#e5effd] font-semibold rounded-md text-sm px-6 py-3 block w-full"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex gap-1 items-center justify-center">
                    <span>Submitting...</span>
                    <CircleLoader size={16} color="black" />
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          <div className="z-10 relative lg:col-span-2 mx-auto lg:ms-auto 2xl:me-10">
            <CustomImage
              src={`${setups.AWS_S3_BASE_URL}analtsis.webp`}
              className="w-full object-contain block mx-auto max-w-[700px]"
              alt="contact-form-img"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
  name,
}) => {
  return (
    <div className="flex flex-col space-y-2 mt-4 flex-1">
      <input
        type={type}
        placeholder={label}
        name={name}
        autoComplete="off"
        className="w-full rounded-md h-12 px-4 bg-[#f0f1f2] text-sm outline-none"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
