import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ClerkFailed, ClerkLoaded, ClerkLoading } from '@clerk/react';
import {
  AlertCircle,
  ExternalLink,
  KeyRound,
  Lock,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useAppAuth } from '../context/AppAuthContext';
import { parseApiJson } from '../lib/api';
import { BrandMark } from './BrandMark';

interface PortalAuthStatus {
  clerkConfigured: boolean;
  passcodeEnvConfigured: boolean;
  setupRequired: boolean;
  staffCount: number;
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const {
    isClerkConfigured,
    isLoaded,
    isSignedIn,
    authResolved,
    canAccessAdmin,
    getToken,
    signOut,
    signInLocalPortal,
    setupLocalPortal,
  } = useAppAuth();
  const location = useLocation();

  const [checkingOwner, setCheckingOwner] = useState(true);
  const [ownerInitialized, setOwnerInitialized] = useState<boolean | null>(null);
  const [setupToken, setSetupToken] = useState('');
  const [bootstrapLoading, setBootstrapLoading] = useState(false);
  const [bootstrapError, setBootstrapError] = useState<string | null>(null);
  const [bootstrapSuccess, setBootstrapSuccess] = useState<string | null>(null);

  // Standalone Portal State (when Clerk SSO is not configured)
  const [portalStatusLoading, setPortalStatusLoading] = useState(!isClerkConfigured);
  const [portalStatus, setPortalStatus] = useState<PortalAuthStatus | null>(null);
  const [portalFullName, setPortalFullName] = useState("Oge's Special Manager");
  const [portalEmail, setPortalEmail] = useState('');
  const [portalPasscode, setPortalPasscode] = useState('');
  const [portalSubmitting, setPortalSubmitting] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/auth/admin/status', { credentials: 'same-origin' })
      .then((res) => parseApiJson<PortalAuthStatus>(res))
      .then((data) => {
        setPortalStatus(data);
      })
      .catch(() => {
        setPortalStatus({
          clerkConfigured: isClerkConfigured,
          passcodeEnvConfigured: false,
          setupRequired: false,
          staffCount: 0,
        });
      })
      .finally(() => {
        setPortalStatusLoading(false);
      });

    if (!isClerkConfigured) {
      setCheckingOwner(false);
      return;
    }

    if (isSignedIn) {
      fetch('/api/health')
        .then((res) => parseApiJson<{ ownerInitialized?: boolean }>(res))
        .then((data) => {
          setOwnerInitialized(Boolean(data.ownerInitialized));
        })
        .catch(() => {
          setOwnerInitialized(false);
        })
        .finally(() => {
          setCheckingOwner(false);
        });
    } else {
      setCheckingOwner(false);
    }
  }, [isClerkConfigured, isSignedIn]);

  const handleBootstrapOwner = async (e: React.FormEvent) => {
    e.preventDefault();
    setBootstrapLoading(true);
    setBootstrapError(null);
    setBootstrapSuccess(null);

    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Authentication session token unavailable. Please sign in again.');
      }
      const res = await fetch('/api/admin/bootstrap-owner', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ setupToken }),
      });
      await parseApiJson<{ success?: boolean; message?: string }>(
        res,
        'Failed to claim initial owner profile.'
      );
      setBootstrapSuccess('Initial owner profile provisioned successfully! Refreshing access...');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err: unknown) {
      setBootstrapError(err instanceof Error ? err.message : 'An error occurred during bootstrap.');
    } finally {
      setBootstrapLoading(false);
    }
  };

  const handleLocalPortalSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setPortalSubmitting(true);
    setPortalError(null);
    try {
      await setupLocalPortal({
        fullName: portalFullName.trim() || "Oge's Special Manager",
        email: portalEmail.trim() || 'ogesspecial01@gmail.com',
        passcode: portalPasscode.trim(),
      });
      setPortalPasscode('');
      setPortalStatus((prev) =>
        prev
          ? { ...prev, setupRequired: false }
          : { clerkConfigured: false, passcodeEnvConfigured: false, setupRequired: false, staffCount: 0 }
      );
    } catch (err: unknown) {
      setPortalError(err instanceof Error ? err.message : 'Unable to complete initial setup.');
    } finally {
      setPortalSubmitting(false);
    }
  };

  const handleLocalPortalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPortalSubmitting(true);
    setPortalError(null);
    try {
      await signInLocalPortal({
        email: portalEmail.trim() || undefined,
        passcode: portalPasscode.trim(),
      });
      setPortalPasscode('');
    } catch (err: unknown) {
      setPortalError(err instanceof Error ? err.message : 'Invalid email or portal passcode.');
    } finally {
      setPortalSubmitting(false);
    }
  };

  if (!isClerkConfigured) {
    if (isSignedIn && canAccessAdmin) {
      return <>{children}</>;
    }

    if (portalStatusLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FBF8F3]">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 mx-auto rounded-full border-2 border-[#163828]/20 border-t-[#163828] animate-spin" />
            <p className="text-sm text-[#5E544C]">Checking Oge&apos;s Special portal status...</p>
          </div>
        </div>
      );
    }

    if (isSignedIn && !canAccessAdmin) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FBF8F3] px-4 py-12">
          <div className="w-full max-w-md bg-[#FFFFFF] rounded-xl border border-[#241B15]/10 p-6 sm:p-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h1 className="font-display text-2xl font-semibold text-[#241B15]">
              Portal Access Restricted
            </h1>
            <p className="text-sm text-[#5E544C] leading-relaxed">
              Your account does not currently hold Staff or Manager permissions.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Link
                to="/"
                className="px-4 py-2 rounded-lg border border-[#241B15]/15 text-sm font-medium text-[#241B15] hover:bg-[#F4EFE6]"
              >
                Return Home
              </Link>
              <button
                type="button"
                onClick={() => void signOut()}
                className="px-4 py-2 rounded-lg bg-[#163828] text-[#FBF8F3] text-sm font-medium hover:bg-[#1E4D36] cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      );
    }

    const setupRequired = Boolean(portalStatus?.setupRequired);

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF8F3] px-4 py-12">
        <div className="w-full max-w-md bg-[#FFFFFF] rounded-xl border border-[#163828]/12 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <BrandMark variant="dark" size="md" />
            </div>
            <div className="pt-2 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C25E2E]">
              {setupRequired ? <KeyRound className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>Kitchen Management Portal</span>
            </div>
            <h1 className="font-display text-2xl font-semibold text-[#241B15]">
              {setupRequired ? 'Set Up Admin Portal Passcode' : 'Admin & Staff Portal Sign In'}
            </h1>
            <p className="text-xs sm:text-sm text-[#5E544C] leading-relaxed">
              {setupRequired
                ? 'Claim initial Manager access by creating your private portal passcode (minimum 8 characters).'
                : 'Enter your Manager passcode, or sign in with your Staff email and portal passcode.'}
            </p>
          </div>

          {portalError && (
            <div className="p-3 rounded-lg bg-[#B91C1C]/10 border border-[#B91C1C]/20 text-xs text-[#B91C1C] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{portalError}</span>
            </div>
          )}

          {setupRequired ? (
            <form onSubmit={handleLocalPortalSetup} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E544C] mb-1">
                  Manager Full Name
                </label>
                <input
                  type="text"
                  required
                  value={portalFullName}
                  onChange={(e) => setPortalFullName(e.target.value)}
                  placeholder="Oge's Special Manager"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#241B15]/20 bg-[#FBF8F3] text-sm text-[#241B15]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E544C] mb-1">
                  Manager Email
                </label>
                <input
                  type="email"
                  required
                  value={portalEmail}
                  onChange={(e) => setPortalEmail(e.target.value)}
                  placeholder="ogesspecial01@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#241B15]/20 bg-[#FBF8F3] text-sm text-[#241B15]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E544C] mb-1">
                  Create Admin Passcode
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={portalPasscode}
                  onChange={(e) => setPortalPasscode(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#241B15]/20 bg-[#FBF8F3] text-sm text-[#241B15]"
                />
              </div>
              <button
                type="submit"
                disabled={portalSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#163828] hover:bg-[#1E4D36] text-[#FBF8F3] text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#E8C67A]" />
                <span>{portalSubmitting ? 'Activating Portal...' : 'Claim Manager Portal Access'}</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleLocalPortalLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E544C] mb-1">
                  Team Email <span className="normal-case font-normal">(optional for Manager)</span>
                </label>
                <input
                  type="email"
                  value={portalEmail}
                  onChange={(e) => setPortalEmail(e.target.value)}
                  placeholder="ogesspecial01@gmail.com or leave blank"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#241B15]/20 bg-[#FBF8F3] text-sm text-[#241B15]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E544C] mb-1">
                  Portal Passcode
                </label>
                <input
                  type="password"
                  required
                  value={portalPasscode}
                  onChange={(e) => setPortalPasscode(e.target.value)}
                  placeholder="Enter admin or staff passcode"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#241B15]/20 bg-[#FBF8F3] text-sm text-[#241B15]"
                />
              </div>
              <button
                type="submit"
                disabled={portalSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#163828] hover:bg-[#1E4D36] text-[#FBF8F3] text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-[#E8C67A]" />
                <span>{portalSubmitting ? 'Signing In...' : 'Sign In to Admin Portal'}</span>
              </button>
            </form>
          )}

          <div className="pt-3 border-t border-[#241B15]/10 flex items-center justify-between text-xs text-[#5E544C]">
            <Link to="/" className="hover:text-[#163828] font-medium">
              &larr; Back to Oge&apos;s Special
            </Link>
            <span>Role-Based Portal Auth</span>
          </div>
        </div>
      </div>
    );
  }

  if (isSignedIn && canAccessAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <ClerkLoading>
        <div className="min-h-screen flex items-center justify-center bg-[#FBF8F3]">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 mx-auto rounded-full border-2 border-[#163828]/20 border-t-[#163828] animate-spin" />
            <p className="text-sm text-[#5E544C]">Verifying admin access...</p>
          </div>
        </div>
      </ClerkLoading>

      <ClerkFailed>
        <div className="min-h-screen flex items-center justify-center bg-[#FBF8F3] px-4 py-12">
          <div className="w-full max-w-md bg-[#FFFFFF] rounded-xl border border-[#B91C1C]/20 p-6 sm:p-8 text-center space-y-5 shadow-sm">
            <div className="w-11 h-11 mx-auto rounded-full bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h1 className="font-display text-xl font-semibold text-[#241B15]">
                Authentication Unavailable in Embedded View
              </h1>
              <p className="text-sm text-[#5E544C] leading-relaxed">
                Clerk could not load inside this embedded frame. Open the portal in a full browser tab to sign in with Clerk.
              </p>
            </div>
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

            {portalStatus?.passcodeEnvConfigured && (
              <form
                onSubmit={handleLocalPortalLogin}
                className="pt-5 border-t border-[#241B15]/10 text-left space-y-3"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#163828]">
                  Or Sign In with Admin Passcode
                </p>
                {portalError && (
                  <div className="p-2.5 rounded-lg bg-[#B91C1C]/10 border border-[#B91C1C]/20 text-xs text-[#B91C1C] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{portalError}</span>
                  </div>
                )}
                <input
                  type="password"
                  required
                  value={portalPasscode}
                  onChange={(e) => setPortalPasscode(e.target.value)}
                  placeholder="Enter ADMIN_PASSCODE"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#241B15]/20 bg-[#FBF8F3] text-sm text-[#241B15]"
                />
                <button
                  type="submit"
                  disabled={portalSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-[#163828] text-[#163828] hover:bg-[#163828]/5 text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>{portalSubmitting ? 'Signing In...' : 'Sign In with Passcode'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </ClerkFailed>

      <ClerkLoaded>
        {!isLoaded || (isSignedIn && (!authResolved || checkingOwner)) ? (
          <div className="min-h-screen flex items-center justify-center bg-[#FBF8F3]">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 mx-auto rounded-full border-2 border-[#163828]/20 border-t-[#163828] animate-spin" />
              <p className="text-sm text-[#5E544C]">Verifying admin permissions...</p>
            </div>
          </div>
        ) : !isSignedIn ? (
          <Navigate
            to={`/sign-in?redirect_url=${encodeURIComponent(location.pathname + location.search)}`}
            replace
          />
        ) : !canAccessAdmin ? (
          <div className="min-h-screen flex items-center justify-center bg-[#FBF8F3] px-4 py-12">
            <div className="w-full max-w-lg bg-[#FFFFFF] rounded-xl border border-[#241B15]/10 p-6 sm:p-8 text-left space-y-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="font-display text-xl font-semibold text-[#241B15]">
                    Admin Access Restricted
                  </h1>
                  <p className="text-sm text-[#5E544C]">
                    Your account is signed in, but does not currently hold administrator privileges.
                  </p>
                </div>
              </div>

              {ownerInitialized === false ? (
                <div className="p-5 rounded-xl bg-[#F4EFE6] border border-[#163828]/15 space-y-4">
                  <div className="flex items-center gap-2.5 text-[#163828]">
                    <KeyRound className="w-5 h-5" />
                    <h2 className="font-semibold text-sm">Initial Kitchen Owner Bootstrap</h2>
                  </div>
                  <p className="text-xs text-[#5E544C] leading-relaxed">
                    No owner has been provisioned in the database yet. You can securely claim initial owner privileges for your signed-in account using the bootstrap setup token.
                  </p>

                  <form onSubmit={handleBootstrapOwner} className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-[#241B15] mb-1">
                        Bootstrap Setup Token
                      </label>
                      <input
                        type="text"
                        value={setupToken}
                        onChange={(e) => setSetupToken(e.target.value)}
                        placeholder="Enter bootstrap token"
                        className="w-full px-3 py-2 text-sm bg-white border border-[#241B15]/20 rounded-lg focus:outline-none focus:border-[#163828]"
                        required
                      />
                      <p className="text-[11px] text-[#5E544C] mt-1">
                        Enter the server environment variable <code className="bg-white px-1.5 py-0.5 rounded border border-[#241B15]/10 font-mono text-xs">OGE_SPECIAL_BOOTSTRAP_TOKEN</code>.
                      </p>
                    </div>

                    {bootstrapError && (
                      <div className="p-3 rounded-lg bg-[#B91C1C]/10 text-[#B91C1C] text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{bootstrapError}</span>
                      </div>
                    )}

                    {bootstrapSuccess && (
                      <div className="p-3 rounded-lg bg-[#163828]/10 text-[#163828] text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{bootstrapSuccess}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={bootstrapLoading}
                      className="w-full py-2.5 px-4 rounded-lg bg-[#163828] hover:bg-[#1E4D36] text-[#FBF8F3] text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {bootstrapLoading ? 'Provisioning Owner...' : 'Claim Initial Owner Access'}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-[#F4EFE6] text-xs text-[#5E544C]">
                  An owner is already registered for this kitchen database. Contact the existing owner to request staff invitation access.
                </div>
              )}

              <div className="pt-2 flex flex-wrap justify-between items-center gap-3 border-t border-[#241B15]/10">
                <div className="flex gap-2">
                  <Link
                    to="/menu"
                    className="px-4 py-2 rounded-lg bg-[#163828] hover:bg-[#1E4D36] text-[#FBF8F3] text-xs font-medium transition-colors"
                  >
                    Browse Menu
                  </Link>
                  <Link
                    to="/"
                    className="px-4 py-2 rounded-lg border border-[#241B15]/15 text-xs font-medium text-[#241B15] hover:bg-[#F4EFE6] transition-colors"
                  >
                    Home
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="px-4 py-2 rounded-lg border border-[#241B15]/15 text-xs font-medium text-[#5E544C] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>{children}</>
        )}
      </ClerkLoaded>
    </>
  );
}
