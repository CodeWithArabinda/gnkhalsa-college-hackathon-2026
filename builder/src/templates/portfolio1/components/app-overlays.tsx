import { useLocation } from "react-router-dom";
import Particles from "@portfolio1/components/Particles";
import RemoteCursors from "@portfolio1/components/realtime/remote-cursors";
import EasterEggs from "@portfolio1/components/easter-eggs";
import ElasticCursor from "@portfolio1/components/ui/ElasticCursor";
import RadialMenu from "@portfolio1/components/radial-menu/index";
import MotionNudge from "@portfolio1/components/motion-nudge";
import DomainNotice from "@portfolio1/components/domain-notice";
import Analytics from "@portfolio1/components/analytics";
import { usePerfProfile } from "@portfolio1/hooks/use-perf-profile";

export default function AppOverlays() {
  const location = useLocation();
  const pathname = location.pathname;
  const isHome = pathname === "/";
  // The résumé route disables the elastic cursor (keeps the particle bg).
  const isResume = pathname?.startsWith("/resume") ?? false;

  const { particleCount, maxDpr, disableDecorative } = usePerfProfile();

  return (
    <>
      {particleCount > 0 && (
        <Particles
          className="fixed inset-0 -z-10 animate-fade-in"
          quantity={particleCount}
          maxDpr={maxDpr}
        />
      )}
      {isHome && <RemoteCursors />}
      <EasterEggs />
      {!isResume && !disableDecorative && <ElasticCursor />}
      {isHome && <RadialMenu />}
      {isHome && <MotionNudge />}
      <DomainNotice />
      <Analytics />
    </>
  );
}
