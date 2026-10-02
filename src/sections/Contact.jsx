"use client";

import { useState } from "react";
import { App, Button, Form, Input, Select } from "antd";
import { motion } from "motion/react";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiUpwork } from "react-icons/si";
import { profile, services } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Reveal from "@/components/ui/Reveal";

// Web3Forms emails every submission to the address tied to this access key.
// Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local (see README).
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const budgets = ["< $1k", "$1k – $5k", "$5k – $15k", "$15k+", "Not sure yet"];

export default function Contact() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { notification } = App.useApp();

  const onFinish = async (values) => {
    if (values.botcheck) return; // honeypot filled → silently drop spam

    if (!WEB3FORMS_KEY) {
      notification.warning({
        title: "Contact form not configured",
        description: `Add NEXT_PUBLIC_WEB3FORMS_KEY to .env.local. Meanwhile, email ${profile.email} directly.`,
        placement: "bottomRight",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New portfolio inquiry from ${values.name}`,
          from_name: "Portfolio Contact Form",
          replyto: values.email,
          name: values.name,
          email: values.email,
          service: values.service || "—",
          budget: values.budget || "—",
          message: values.message,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Submission failed");

      notification.success({
        title: "Message sent!",
        description: "Thanks for reaching out — I'll get back to you within 24 hours.",
        placement: "bottomRight",
      });
      form.resetFields();
    } catch (err) {
      notification.error({
        title: "Something went wrong",
        description: `${err.message}. You can also email ${profile.email}.`,
        placement: "bottomRight",
      });
    } finally {
      setLoading(false);
    }
  };

  const links = [
    { href: profile.socials.linkedin, Icon: FaLinkedinIn, label: "LinkedIn" },
    { href: profile.socials.github, Icon: FaGithub, label: "GitHub" },
    { href: profile.socials.upwork, Icon: SiUpwork, label: "Upwork" },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-36">
      <div aria-hidden className="aurora-blob -bottom-40 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 bg-[var(--glow)] opacity-60" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Let's build / 08"
          title="Have a problem"
          highlight="worth solving?"
          desc="Tell me what you're building, what is broken, or what you want to automate. I usually reply within a day."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          <Reveal>
            <SpotlightCard className="flex h-full flex-col p-8">
              <p className="eyebrow mb-3 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" /> Available for select projects
              </p>
              <h3 className="font-display text-3xl font-semibold">Start a conversation.</h3>
              <p className="mt-3 text-muted">
                Full-stack products, AI integrations, automation workflows, APIs, and existing builds that need a technical partner.
              </p>

              <a
                href={`mailto:${profile.email}`}
                className="group mt-8 flex items-center gap-4 rounded-2xl border border-line p-4 transition-colors hover:border-accent"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-ink">
                  <Mail size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-muted">Email me</span>
                  <span className="block truncate font-medium">{profile.email}</span>
                </span>
                <ArrowUpRight size={18} className="text-muted transition-transform group-hover:rotate-45 group-hover:text-accent" />
              </a>

              {/* Code card (from the original design) */}
              <pre className="mt-6 flex-1 overflow-x-auto rounded-2xl border border-line bg-bg p-5 font-mono text-[13px] leading-relaxed text-muted">
                <span className="text-accent-2">const</span> project = {"{"}
                {"\n"}  scope: <span className="text-accent">&quot;AI + Full-Stack&quot;</span>,
                {"\n"}  automation: <span className="text-accent-2">true</span>,
                {"\n"}  deployment: <span className="text-accent">&quot;production&quot;</span>
                {"\n"}{"}"};{"\n\n"}
                <span className="text-accent-2">return</span> build(project);
              </pre>

              <div className="mt-6 flex gap-2">
                {links.map(({ href, Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3 }}
                    className="glass grid h-11 w-11 place-items-center rounded-full text-muted hover:text-accent"
                  >
                    <Icon size={17} />
                  </motion.a>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="gradient-border h-full">
              <SpotlightCard className="contact-form h-full p-8 md:p-10">
                <Form form={form} layout="vertical" size="large" requiredMark={false} onFinish={onFinish}>
                  {/* Honeypot: hidden from humans, bots tend to fill it */}
                  <Form.Item name="botcheck" hidden>
                    <Input tabIndex={-1} autoComplete="off" />
                  </Form.Item>

                  <div className="grid gap-x-5 sm:grid-cols-2">
                    <Form.Item label="Your name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
                      <Input placeholder="Jane Doe" autoComplete="name" />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Please enter your email" },
                        { type: "email", message: "That doesn't look like a valid email" },
                      ]}
                    >
                      <Input placeholder="jane@company.com" autoComplete="email" />
                    </Form.Item>
                    <Form.Item label="What do you need?" name="service">
                      <Select
                        placeholder="Pick a service"
                        allowClear
                        options={[...services.map((s) => ({ value: s.title, label: s.title })), { value: "Other", label: "Something else" }]}
                      />
                    </Form.Item>
                    <Form.Item label="Budget" name="budget">
                      <Select placeholder="Select a range" allowClear options={budgets.map((b) => ({ value: b, label: b }))} />
                    </Form.Item>
                  </div>

                  <Form.Item
                    label="Project details"
                    name="message"
                    rules={[
                      { required: true, message: "Tell me a little about your project" },
                      { min: 20, message: "A bit more detail please (20+ characters)" },
                    ]}
                  >
                    <Input.TextArea rows={5} placeholder="What are you building, what's broken, or what would you like to automate?" showCount maxLength={2000} />
                  </Form.Item>

                  <Button type="primary" htmlType="submit" block loading={loading} icon={<Send size={16} />} iconPlacement="end" className="!h-14 !rounded-full !text-base">
                    {loading ? "Sending..." : "Send message"}
                  </Button>
                  <p className="mt-4 text-center text-xs text-muted">Your details are only used to reply to your message.</p>
                </Form>
              </SpotlightCard>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
