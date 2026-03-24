import { Toaster } from 'react-hot-toast'

export default function NotificationToast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1a1a2e',
          color: '#fff',
          borderRadius: '12px',
          border: '1px solid #2a2a3e',
          fontSize: '14px',
          padding: '12px 16px',
        },
        success: {
          iconTheme: { primary: '#FF6B2B', secondary: '#fff' },
          style: { borderLeft: '4px solid #FF6B2B' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#fff' },
          style: { borderLeft: '4px solid #ef4444' },
        },
      }}
    />
  )
}
