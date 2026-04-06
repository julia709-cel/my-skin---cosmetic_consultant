export default function MinimalTest() {
  const handleClick = () => {
    alert('✅ Button works! No reload!');
    console.log('🔵 Clicked!');
  };

  return (
    <div style={{ padding: '4rem', color: 'white', background: '#000', minHeight: '100vh' }}>
      <h1>🧪 MINIMAL TEST</h1>
      <button 
        type="button" 
        onClick={handleClick}
        style={{ padding: '20px 40px', fontSize: '20px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }}
      >
        CLICK ME
      </button>
      <p style={{ marginTop: '2rem', color: '#888' }}>
        Если после клика появится alert и страница НЕ перезагрузится — проблема в Login.tsx или CSS.
        Если перезагрузится — проблема глобальная (браузер, Vite, расширение).
      </p>
    </div>
  );
}