import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ClerkFailed, ClerkLoaded, ClerkLoading } from '@clerk/react';
import { AlertCircle, ExternalLink, Lock } from 'lucide-react';
import { useAppAuth } from '../context/AppAuthContext';
import { RESTAURANT_IMAGES } from '../data/meals';
import { PageHero } from './PageHero';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isClerkConfigured, isLoaded, isSignedIn } = useAppAuth();
  const location = useLocation();

  if (!isClerkConfigured) {
    return (
      <div>
        <PageHero
          eyebrow="Protected Area"
          title="Sign In Required"
          subtitle="This page requires an authenticated account."
          image={RESTAURANT_IMAGES.hero}
          imageAlt="Oge's Special authentic Igbo delicacies spread"
        />
        <section className="py-16 bg-[#FBF8F3]">
          <div className="max-w-lg mx-auto px-4">
            <div className="bg-[#FFFFFF] rounded-xl border border-[#241B15]/10 p-6 sm:p-8 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#163828]/8 text-[#163828] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-[#241B15]">
                Connect Clerk to Access This Page
              </h2>
              <p className="text-sm text-[#5E544C] leading-relaxed">
                This route is protected and requires account authentication. Add{' '}
                <code className="px-1.5 py-0.5 rounded bg-[#F4EFE6] text-[#241B15] text-xs">
                  VITE_CLERK_PUBLISHABLE_KEY
                </code>
                ,{' '}
                <code className="px-1.5 py-0.5 rounded bg-[#F4EFE6] text-[#241B15] text-xs">
                  CLERK_PUBLISHABLE_KEY
                </code>
                , and{' '}
                <code className="px-1.5 py-0.5 rounded bg-[#F4EFE6] text-[#241B15] text-xs">
                  CLERK_SECRET_KEY
                </code>{' '}
                to enable Clerk sign-in.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <Link
                  to="/sign-in"
                  className="px-5 py-2.5 rounded-lg bg-[#163828] hover:bg-[#1E4D36] text-[#FBF8F3] text-sm font-medium transition-colors"
                >
                  View Setup Guide
                </Link>
                <Link
                  to="/menu"
                  className="px-5 py-2.5 rounded-lg border border-[#241B15]/15 text-sm font-medium text-[#241B15] hover:bg-[#F4EFE6] transition-colors"
                >
                  Browse Menu
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <ClerkLoading>
        <div className="min-h-[70vh] flex items-center justify-center bg-[#FBF8F3] pt-24">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 mx-auto rounded-full border-2 border-[#163828]/20 border-t-[#163828] animate-spin" />
            <p className="text-sm text-[#5E544C]">Checking authentication...</p>
          </div>
        </div>
      </ClerkLoading>

      <ClerkFailed>
        <div className="min-h-[70vh] flex items-center justify-center bg-[#FBF8F3] pt-24 px-4">
          <div className="w-full max-w-md bg-[#FFFFFF] rounded-xl border border-[#B91C1C]/20 p-6 sm:p-8 text-center space-y-4">
            <div className="w-11 h-11 mx-auto rounded-full bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h2 className="font-display text-xl font-semibold text-[#241B15]">
              Authentication Unavailable in Embedded View
            </h2>
            <p className="text-sm text-[#5E544C] leading-relaxed">
              Clerk could not load inside this frame. Try opening the app in a full browser tab.
            </p>
            {typeof window !== 'undefined' && (
              <a
                href={window.location.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#163828] hover:bg-[#1E4D36] text-[#FBF8F3] text-sm font-medium transition-colors"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </ClerkFailed>

      <ClerkLoaded>
        {!isLoaded ? (
          <div className="min-h-[70vh] flex items-center justify-center bg-[#FBF8F3] pt-24">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 mx-auto rounded-full border-2 border-[#163828]/20 border-t-[#163828] animate-spin" />
              <p className="text-sm text-[#5E544C]">Checking authentication...</p>
            </div>
          </div>
        ) : !isSignedIn ? (
          <Navigate
            to={`/sign-in?redirect_url=${encodeURIComponent(location.pathname + location.search)}`}
            replace
          />
        ) : (
          <>{children}</>
        )}
      </ClerkLoaded>
    </>
  );
}
