
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: 'hsl(210, 20%, 90%)',
        input: 'hsl(210, 20%, 90%)',
        ring: 'hsl(215, 80%, 55%)',
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(222, 47%, 11%)',
        primary: {
          DEFAULT: 'hsl(230, 60%, 30%)', // Deeper Navy Blue
          foreground: 'hsl(0, 0%, 100%)',
          light: 'hsl(230, 60%, 50%)', // Slightly lighter for better contrast
        },
        secondary: {
          DEFAULT: 'hsl(230, 30%, 95%)', // Light Navy Blue
          foreground: 'hsl(222, 47%, 11%)'
        },
        muted: {
          DEFAULT: 'hsl(230, 20%, 95%)',
          foreground: 'hsl(230, 30%, 50%)'
        },
        accent: {
          DEFAULT: 'hsl(230, 50%, 95%)', // Very Light Navy Blue
          foreground: 'hsl(230, 60%, 40%)'
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '3xl': '1.5rem',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'pulse-slow': {
          '0%, 100%': {
            opacity: 1
          },
          '50%': {
            opacity: 0.8
          }
        },
        'slide-in': {
          '0%': {
            transform: 'translateY(10px)',
            opacity: 0
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1
          }
        },
        // New iOS-like animation
        'ios-bounce': {
          '0%, 100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(0.97)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-slow': 'pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slide-in 0.3s ease-out forwards',
        'ios-bounce': 'ios-bounce 1.5s infinite',
      },
      backgroundImage: {
        'gradient-ios': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
