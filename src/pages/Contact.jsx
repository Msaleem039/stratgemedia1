import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      await axios.post('https://api.strategemmedia.com/api/submit', form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#232946] pb-16 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4 text-[#232946]">Contact Us</h2>
      <p className="text-lg text-[#232946] mb-4 max-w-2xl text-center">Have questions or want to work with us? Reach out below!</p>
      <form className="w-full max-w-md bg-[#F4F6FB] p-6 rounded-xl shadow-lg space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full px-4 py-2 rounded border border-[#41D1FF] focus:outline-none"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full px-4 py-2 rounded border border-[#41D1FF] focus:outline-none"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="w-full px-4 py-2 rounded border border-[#41D1FF] focus:outline-none"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          className="w-full px-4 py-2 rounded border border-[#41D1FF] focus:outline-none"
          rows={4}
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="w-full bg-[#41D1FF] text-[#232946] font-bold py-2 rounded hover:bg-[#232946] hover:text-[#41D1FF] transition">
          Send
        </button>
        {status === 'success' && <p className="text-green-600 text-center">Message sent successfully!</p>}
        {status === 'error' && <p className="text-red-600 text-center">Failed to send message. Please try again.</p>}
      </form>
    </div>
  );
};

export default Contact; 