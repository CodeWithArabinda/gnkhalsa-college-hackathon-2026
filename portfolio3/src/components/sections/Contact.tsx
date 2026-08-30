import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { EarthCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import { usePortfolio } from "../../contexts/PortfolioContext";

const INITIAL_STATE = {
  name: "",
  email: "",
  message: "",
};

const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_dummy",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_dummy",
  accessToken: import.meta.env.VITE_EMAILJS_ACCESS_TOKEN || "token_dummy",
};

const Contact = () => {
  const { config, socialLinks } = usePortfolio();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    if (e === undefined) return;
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    if (e === undefined) return;
    e.preventDefault();
    setLoading(true);

    if (
      !import.meta.env.VITE_EMAILJS_SERVICE_ID ||
      emailjsConfig.serviceId === "service_dummy"
    ) {
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        setForm(INITIAL_STATE);
      }, 1000);
      return;
    }

    emailjs
      .send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          form_name: form.name,
          to_name: config.html.fullName,
          from_email: form.email,
          to_email: config.html.email,
          message: form.message,
        },
        emailjsConfig.accessToken
      )
      .then(
        () => {
          setLoading(false);
          setSubmitted(true);
          setForm(INITIAL_STATE);
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("Something went wrong sending your message. Please try again.");
        }
      );
  };

  return (
    <div
      className={`flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="bg-black-100 flex-[0.75] rounded-2xl p-8 border border-white/5"
      >
        <p className="text-secondary font-semibold text-[14px] uppercase tracking-wider">
          {config.contact.p}
        </p>
        <h2 className="text-white font-extrabold md:text-[50px] sm:text-[40px] text-[30px] mt-1">
          LET'S WORK TOGETHER
        </h2>
        <p className="text-[#915EFF] font-semibold text-[16px] mt-2">
          "Have an interesting project or opportunity? Let's talk."
        </p>

        {/* Direct Contact Info */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <a
            href={`mailto:${config.html.email}`}
            className="bg-tertiary px-4 py-2 rounded-xl text-white hover:text-[#915EFF] border border-white/10 transition-colors flex items-center gap-2"
          >
            📧 {config.html.email}
          </a>
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-tertiary px-4 py-2 rounded-xl text-secondary hover:text-white border border-white/10 transition-colors"
            >
              {s.name}
            </a>
          ))}
        </div>

        {submitted ? (
          <div className="mt-8 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-emerald-400 text-center">
            <h4 className="text-lg font-bold">Message Sent Successfully! 🎉</h4>
            <p className="text-sm mt-2 text-slate-300">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs font-semibold underline text-emerald-300"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-6"
          >
            {Object.keys(config.contact.form).map((input) => {
              const { span, placeholder } =
                config.contact.form[input as keyof typeof config.contact.form];
              const Component = input === "message" ? "textarea" : "input";

              return (
                <label key={input} className="flex flex-col">
                  <span className="mb-2 font-medium text-white text-sm">{span}</span>
                  <Component
                    type={input === "email" ? "email" : "text"}
                    name={input}
                    required
                    value={form[input as keyof typeof INITIAL_STATE]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="bg-tertiary placeholder:text-secondary rounded-xl border border-white/10 px-5 py-3.5 font-medium text-white outline-none focus:border-[#915EFF] transition-colors"
                    {...(input === "message" && { rows: 5 })}
                  />
                </label>
              );
            })}
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-primary w-fit rounded-xl px-8 py-3.5 font-bold text-white shadow-md outline-none transition-all duration-300"
            >
              {loading ? "Sending Message..." : "Get In Touch"}
            </button>
          </form>
        )}
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
