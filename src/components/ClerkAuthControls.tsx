import { Link } from 'react-router-dom';
import { ClerkFailed, ClerkLoading, Show, UserButton } from '@clerk/react';
import { ShieldCheck, User } from 'lucide-react';
import { useAppAuth } from '../context/AppAuthContext';

interface ClerkAuthControlsProps {
  isOverDarkHero?: boolean;
  variant?: 'desktop' | 'mobile';
  onAction?: () => void;
}

function SignedOutButtons({
  isOverDarkHero,
  variant,
  onAction,
}: {
  isOverDarkHero: boolean;
  variant: 'desktop' | 'mobile';
  onAction?: () => void;
}) {
  if (variant === 'desktop') {
    return (
      <div className="flex items-center gap-2 shrink-0">
        <Link
          to="/sign-in"
          onClick={onAction}
          className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            isOverDarkHero
              ? 'text-[#FBF8F3]/90 hover:text-white hover:bg-white/10'
              : 'text-[#241B15] hover:text-[#163828] hover:bg-[#163828]/5'
          }`}
        >
          Sign In
        </Link>
        <Link
          to="/sign-up"
          onClick={onAction}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            isOverDarkHero
              ? 'bg-[#E8C67A] text-[#0E261B] hover:bg-[#F3D896]'
              : 'bg-[#163828] text-[#FBF8F3] hover:bg-[#1E4D36]'
          }`}
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 pt-2">
      <Link
        to="/sign-in"
        onClick={onAction}
        className="w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg border border-[#241B15]/20 text-[#241B15] hover:bg-[#F4EFE6] transition-colors whitespace-nowrap"
      >
        Sign In
      </Link>
      <Link
        to="/sign-up"
        onClick={onAction}
        className="w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg bg-[#163828] text-[#FBF8F3] hover:bg-[#1E4D36] transition-colors whitespace-nowrap"
      >
        Sign Up
      </Link>
    </div>
  );
}

export function ClerkAuthControls({
  isOverDarkHero = false,
  variant = 'desktop',
  onAction,
}: ClerkAuthControlsProps) {
  const { isClerkConfigured, isSignedIn, canAccessAdmin, userId, fullName, signOut } =
    useAppAuth();

  if (!isClerkConfigured) {
    if (isSignedIn && canAccessAdmin) {
      if (variant === 'desktop') {
        return (
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/admin"
              onClick={onAction}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                isOverDarkHero
                  ? 'text-[#E8C67A] hover:text-white hover:bg-white/10'
                  : 'text-[#163828] hover:bg-[#163828]/8'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Portal</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                onAction?.();
                void signOut();
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isOverDarkHero
                  ? 'text-[#FBF8F3]/90 hover:text-white hover:bg-white/10'
                  : 'text-[#C25E2E] hover:bg-[#C25E2E]/8'
              }`}
            >
              Sign Out
            </button>
          </div>
        );
      }

      return (
        <div className="space-y-2 pt-2">
          <Link
            to="/admin"
            onClick={onAction}
            className="block w-full px-3 py-2.5 rounded-lg text-base font-medium text-[#163828] hover:bg-[#163828]/8 transition-colors"
          >
            Admin Portal {fullName ? `(${fullName})` : ''}
          </Link>
          <button
            type="button"
            onClick={() => {
              onAction?.();
              void signOut();
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-[#C25E2E] hover:bg-[#C25E2E]/8 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      );
    }

    return (
      <SignedOutButtons
        isOverDarkHero={isOverDarkHero}
        variant={variant}
        onAction={onAction}
      />
    );
  }

  if (variant === 'desktop') {
    if (isSignedIn && canAccessAdmin && userId === 'portal-owner') {
      return (
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/admin"
            onClick={onAction}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
              isOverDarkHero
                ? 'text-[#E8C67A] hover:text-white hover:bg-white/10'
                : 'text-[#163828] hover:bg-[#163828]/8'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Portal</span>
          </Link>
          <button
            type="button"
            onClick={() => {
              onAction?.();
              void signOut();
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isOverDarkHero
                ? 'text-[#FBF8F3]/90 hover:text-white hover:bg-white/10'
                : 'text-[#C25E2E] hover:bg-[#C25E2E]/8'
            }`}
          >
            Sign Out
          </button>
        </div>
      );
    }

    return (
      <>
        <ClerkLoading>
          <SignedOutButtons
            isOverDarkHero={isOverDarkHero}
            variant="desktop"
            onAction={onAction}
          />
        </ClerkLoading>

        <ClerkFailed>
          <SignedOutButtons
            isOverDarkHero={isOverDarkHero}
            variant="desktop"
            onAction={onAction}
          />
        </ClerkFailed>

        <Show when="signed-out">
          <SignedOutButtons
            isOverDarkHero={isOverDarkHero}
            variant="desktop"
            onAction={onAction}
          />
        </Show>

        <Show when="signed-in">
          <div className="flex items-center gap-2 shrink-0">
            {canAccessAdmin && (
              <Link
                to="/admin"
                onClick={onAction}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isOverDarkHero
                    ? 'text-[#E8C67A] hover:text-white hover:bg-white/10'
                    : 'text-[#163828] hover:bg-[#163828]/8'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            )}
            <Link
              to="/account"
              onClick={onAction}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                isOverDarkHero
                  ? 'text-[#FBF8F3]/90 hover:text-white hover:bg-white/10'
                  : 'text-[#241B15] hover:text-[#163828] hover:bg-[#163828]/5'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Account</span>
            </Link>
            <UserButton />
          </div>
        </Show>
      </>
    );
  }

  if (isSignedIn) {
    return (
      <div className="space-y-2 pt-2">
        {canAccessAdmin && (
          <Link
            to="/admin"
            onClick={onAction}
            className="block w-full px-3 py-2.5 rounded-lg text-base font-medium text-[#163828] hover:bg-[#163828]/8 transition-colors"
          >
            Admin Portal
          </Link>
        )}
        <Link
          to="/account"
          onClick={onAction}
          className="block w-full px-3 py-2.5 rounded-lg text-base font-medium text-[#241B15] hover:bg-[#F4EFE6] transition-colors"
        >
          Account {fullName ? `(${fullName})` : ''}
        </Link>
        <button
          type="button"
          onClick={() => {
            onAction?.();
            void signOut();
          }}
          className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-[#C25E2E] hover:bg-[#C25E2E]/8 transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <SignedOutButtons
      isOverDarkHero={isOverDarkHero}
      variant="mobile"
      onAction={onAction}
    />
  );
}
