import React, { useState } from "react";
import Page from "@/components/utility/Page";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <Page
      currentPage="Contact"
      meta={{
        title: "Contact",
        desc: "Get in touch with Nilesh Gupta for opportunities, work, or just to say hi.",
      }}
    >
      <div className="relative heroElem pt-12 pb-24 text-center max-w-4xl m-auto z-10">


        <img
          className="sqD absolute top-[10px] left-[1%] w-20 hidden md:block"
          style={{ animationDelay: "0.4s" }}
          src="/static/doodles/hero/html.svg"
          alt=""
        />
        <img
          className="sqD absolute top-[80px] right-[0%] w-10 hidden md:block"
          style={{ animationDelay: "0.6s" }}
          src="/static/doodles/hero/pop2.svg"
          alt=""
        />
        <img
          className="sqD absolute top-[120px] left-[4%] w-12 hidden md:block"
          style={{ animationDelay: "0.2s" }}
          src="/static/doodles/hero/code.svg"
          alt=""
        />

        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-white relative inline-block">
          Contact Me
        </h1>
        <p className="text-fun-gray text-xl max-w-2xl m-auto mb-12">
          Have an exciting project or just want to chat? Drop a message!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mt-8 relative">

          {/* Side doodles */}
          <img
            className="sqD absolute -left-20 top-1/3 w-16 hidden md:block opacity-80"
            style={{ animationDelay: "0.3s" }}
            src="/static/doodles/skills/laptop.svg"
            alt=""
          />
          <img
            className="sqD absolute -right-14 top-1/4 w-14 hidden md:block"
            style={{ animationDelay: "0.5s" }}
            src="/static/doodles/testimonials/speech.svg"
            alt=""
          />
          <img
            className="sqD absolute -right-10 bottom-1/4 w-12 hidden md:block"
            style={{ animationDelay: "0.7s" }}
            src="/static/doodles/hero/paintbrush.svg"
            alt=""
          />

          {/* Direct Info Card */}
          <div className="flex flex-col justify-between bg-bg border border-fun-pink-dark p-8 rounded-2xl relative">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Direct Contact</h3>
              <p className="text-fun-gray leading-relaxed mb-6">
                Feel free to email me directly or reach out through my social networks. I typically reply within 24 hours.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-fun-pink mr-3 text-xl">📧</span>
                  <a href="mailto:contact@nileshg.io" className="text-fun-gray hover:text-fun-pink transition-colors">
                    contact@nileshg.io
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-fun-pink-dark/30">
              <h4 className="text-white font-bold mb-4">Social Links</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/nilesh" target="_blank" rel="noreferrer" className="text-fun-gray hover:text-fun-pink transition-colors font-medium">
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-fun-gray hover:text-fun-pink transition-colors font-medium">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-bg border border-fun-pink-dark p-8 rounded-2xl">
            {submitted ? (
              <div className="h-full flex flex-col justify-center items-center text-center py-12">
                <img
                  className="w-20 mb-4"
                  src="/static/doodles/testimonials/yay.svg"
                  alt="Yay"
                />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-fun-gray">
                  Thank you for reaching out. Nilesh will get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm text-fun-pink hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-fun-gray mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-bg border border-fun-gray/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fun-pink transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-fun-gray mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-bg border border-fun-gray/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fun-pink transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-fun-gray mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-bg border border-fun-gray/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fun-pink transition-colors resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer font-bold whitespace-nowrap px-8 py-3 text-white border-2 rounded-full border-white bg-bg hover:bg-fun-pink hover:border-fun-pink transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom doodle strip */}
        <div className="relative mt-16">
          <img className="w-30 m-auto mb-2" src="/static/doodles/lineBreak.svg" alt="" />
          <div className="flex justify-around items-center mt-6 opacity-50">
            <img className="sqD w-12" style={{ animationDelay: "0.2s" }} src="/static/doodles/hero/js.svg" alt="" />
            <img className="sqD w-12" style={{ animationDelay: "0.5s" }} src="/static/doodles/hero/nextjs.svg" alt="" />
            <img className="sqD w-14" style={{ animationDelay: "0.8s" }} src="/static/doodles/skills/star-outline.svg" alt="" />
            <img className="sqD w-12" style={{ animationDelay: "1.1s" }} src="/static/doodles/hero/pop2.svg" alt="" />
          </div>
        </div>

      </div>
    </Page>
  );
}

export default Contact;
