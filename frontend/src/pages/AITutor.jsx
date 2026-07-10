import { useState, useRef, useEffect } from 'react';
import { LayoutDashboard, Calendar, BookOpen, Bot, Crown, Folder, Users, Settings, GraduationCap } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const AITutor = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI IB Tutor. How can I help you with your studies today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      } else {
        const errorData = await response.json();
        setMessages([...newMessages, { role: 'assistant', content: `Error: ${errorData.detail || 'Could not connect to AI.'}` }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Network error. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  const links = [
    { path: '/student', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { path: '/student/sessions', label: 'My Sessions', icon: <Calendar size={18} /> },
    { path: '/student/resources', label: 'Study Materials', icon: <BookOpen size={18} /> },
    { path: '/student/ai-tutor', label: 'AI Tutor', icon: <Bot size={18} /> },
  ];

  return (
    <DashboardLayout role="Student" links={links}>
      <h1 style={{ marginBottom: '1rem' }}>🤖 AI Tutor</h1>
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 200px)', padding: 0 }}>
        
        {/* Chat History */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              background: msg.role === 'user' ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)',
              padding: '1rem 1.5rem',
              borderRadius: msg.role === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0',
              maxWidth: '80%',
              border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.1)'
            }}>
              <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.content}</p>
            </div>
          ))}
          {loading && (
            <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', padding: '1rem 1.5rem', borderRadius: '20px 20px 20px 0' }}>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Thinking...</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} style={{ display: 'flex', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
          <input
            type="text"
            className="form-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about IB subjects..."
            style={{ flexGrow: 1, marginBottom: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            disabled={loading}
          />
          <button type="submit" className="btn-primary" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} disabled={loading || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AITutor;
