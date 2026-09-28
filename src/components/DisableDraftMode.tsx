/** Floating button shown only while draft mode is active — exits it. */
export default function DisableDraftMode() {
  return (
    <a
      href="/api/draft-mode/disable"
      style={{
        position: 'fixed',
        bottom: 8,
        left: 8,
        zIndex: 2147483647,
        padding: '6px 10px',
        borderRadius: 8,
        background: '#0d0d0d',
        color: '#fff',
        fontFamily: 'system-ui, sans-serif',
        fontSize: 12,
        textDecoration: 'none',
        opacity: 0.85,
      }}
    >
      Exit draft mode
    </a>
  );
}