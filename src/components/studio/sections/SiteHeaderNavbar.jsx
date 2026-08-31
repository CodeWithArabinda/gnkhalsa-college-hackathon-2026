import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function SiteHeaderNavbar({
  block,
  index,
  schema,
  selectedElement,
  hoveredElementKey,
  setHoveredElementKey,
  onSelectElement,
  onUpdateElementStyle,
  onPolishWithAI,
  handleOpenEditModal,
  triggerFileUpload,
  title = "Kshitij Pilankar",
  archetype = "bento-minimal",
  scrollToProjects,
  scrollToContact,
  EditableCanvasItem,
  viewMode = 'desktop'
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const blockId = block?.id || "header-nav-block";
  const isMobile = viewMode === 'mobile';

  const renderItem = (key, label, children, className = "") => {
    if (EditableCanvasItem) {
      return (
        <EditableCanvasItem
          elementKey={key}
          label={label}
          schema={schema}
          selectedElement={selectedElement}
          hoveredElementKey={hoveredElementKey}
          setHoveredElementKey={setHoveredElementKey}
          onSelectElement={onSelectElement}
          onUpdateElementStyle={onUpdateElementStyle}
          onPolishWithAI={onPolishWithAI}
          onOpenEditModal={handleOpenEditModal}
          onTriggerUpload={triggerFileUpload}
          blockId={blockId}
          blockIndex={index || 0}
          className={className}
        >
          {children}
        </EditableCanvasItem>
      );
    }
    return children;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToStory = () => {
    const el = document.getElementById('story-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleProjectsClick = () => {
    if (scrollToProjects) scrollToProjects();
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    if (scrollToContact) scrollToContact();
    setIsMobileMenuOpen(false);
  };

  const isCyber = archetype === 'cyber-terminal' || archetype === 'cyber-ai';
  const isBento = archetype === 'bento-minimal';
  const isBrutalist = archetype === 'neo-brutalist';
  const isWarm = archetype === 'warm-editorial';

  const logoUrl = schema?.metadata?.logoUrl || schema?.hero?.avatarUrl;
  const brandName = title || schema?.hero?.name || "Kshitij Pilankar";

  return (
    <header className={`w-full min-h-[56px] h-14 sm:h-16 px-3 sm:px-8 flex items-center justify-between sticky top-0 z-30 font-sans select-none backdrop-blur-md transition-colors ${
      isCyber
        ? 'bg-neutral-950/95 backdrop-blur-md border-b border-cyan-500/20 text-white font-mono'
        : isBento
        ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200 text-slate-900 font-sans shadow-xs'
        : isBrutalist
        ? 'bg-[#FDFBF7] border-b-2 border-black text-black font-sans font-black'
        : 'bg-[#F7F4EE]/95 backdrop-blur-md border-b border-amber-900/10 text-[#2C2621] font-serif shadow-xs'
    }`}>
      
      {/* Left Brand Title & Logo (Selectable / Editable / Replace Image) */}
      {renderItem('nav-brand-logo', 'Navbar Brand Logo', (
        <div
          onClick={scrollToTop}
          className={`font-bold tracking-tight hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-2 ${
            isMobile ? 'text-xs max-w-[60%]' : 'text-xs sm:text-base max-w-[55%] sm:max-w-none'
          }`}
        >
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-black/20 shrink-0" />
          ) : (
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              isCyber ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,245,255,0.8)]' : isBento ? 'bg-slate-900' : isBrutalist ? 'bg-[#FFE600] border border-black' : 'bg-[#C2410C]'
            }`} />
          )}
          <span className={`truncate ${isCyber ? 'text-cyan-400' : isWarm ? 'text-[#2C2621]' : 'text-slate-900'}`}>{brandName}</span>
        </div>
      ))}

      {/* Right Desktop Nav Links (Hidden in Mobile Container Mode) */}
      {!isMobile && (
        <nav className={`hidden md:flex items-center space-x-1 sm:space-x-3 text-xs sm:text-sm font-medium ${
          isCyber ? 'text-slate-300 font-mono' : isWarm ? 'text-[#645647] font-serif' : 'text-slate-700'
        }`}>
          {renderItem('nav-link-home', 'Nav Home Link', (
            <button
              type="button"
              onClick={scrollToTop}
              className={`hover:opacity-100 transition-colors cursor-pointer px-3 py-1.5 rounded-full ${
                isCyber ? 'hover:text-cyan-300 hover:bg-cyan-500/10' : 'hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              Home
            </button>
          ))}

          {renderItem('nav-link-about', 'Nav About Link', (
            <button
              type="button"
              onClick={scrollToStory}
              className={`hover:opacity-100 transition-colors cursor-pointer px-3 py-1.5 rounded-full ${
                isCyber ? 'hover:text-cyan-300 hover:bg-cyan-500/10' : 'hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              About
            </button>
          ))}

          {renderItem('nav-link-works', 'Nav Works Link', (
            <button
              type="button"
              onClick={handleProjectsClick}
              className={`hover:opacity-100 transition-colors cursor-pointer px-3 py-1.5 rounded-full ${
                isCyber ? 'hover:text-cyan-300 hover:bg-cyan-500/10' : 'hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              Selected Works
            </button>
          ))}

          {renderItem('nav-cta-contact', 'Nav Contact Button', (
            <button
              type="button"
              onClick={handleContactClick}
              className={`font-bold text-xs px-4 py-2 transition-all cursor-pointer ${
                isCyber
                  ? 'bg-[#00f5ff] hover:bg-[#00d0db] text-black font-black font-mono shadow-[0_0_15px_rgba(0,245,255,0.3)] rounded-xl'
                  : isBrutalist
                  ? 'bg-[#FFE600] text-black font-black border-2 border-black shadow-[2px_2px_0px_#000] rounded-lg'
                  : isWarm
                  ? 'bg-[#C2410C] hover:bg-[#a3360a] text-white font-serif rounded-full'
                  : 'bg-slate-900 hover:bg-slate-800 text-white font-sans rounded-full'
              }`}
            >
              Contact
            </button>
          ))}
        </nav>
      )}

      {/* Right Mobile Action & CTA in Single Row */}
      {isMobile ? (
        <div className="flex items-center gap-2">
          {renderItem('nav-cta-contact-mobile', 'Nav Contact Button Mobile', (
            <button
              type="button"
              onClick={handleContactClick}
              className={`font-bold text-xs px-3.5 py-1.5 transition-all cursor-pointer ${
                isCyber
                  ? 'bg-[#00f5ff] text-black font-black font-mono rounded-lg shadow-[0_0_10px_rgba(0,245,255,0.3)]'
                  : isBrutalist
                  ? 'bg-[#FFE600] text-black font-black border-2 border-black shadow-[1.5px_1.5px_0px_#000] rounded-md'
                  : isWarm
                  ? 'bg-[#C2410C] text-white font-serif rounded-full px-4'
                  : 'bg-slate-900 text-white font-sans rounded-full px-4'
              }`}
            >
              Contact
            </button>
          ))}
        </div>
      ) : (
        <div className="flex md:hidden items-center gap-2">
          {renderItem('nav-cta-contact-mobile', 'Nav Contact Button Mobile', (
            <button
              type="button"
              onClick={handleContactClick}
              className={`font-bold text-[11px] px-3 py-1 transition-all cursor-pointer ${
                isCyber
                  ? 'bg-[#00f5ff] text-black font-black font-mono rounded-lg'
                  : isBrutalist
                  ? 'bg-[#FFE600] text-black font-black border border-black shadow-[1px_1px_0px_#000] rounded'
                  : isWarm
                  ? 'bg-[#C2410C] text-white font-serif rounded-full'
                  : 'bg-slate-900 text-white font-sans rounded-full'
              }`}
            >
              Contact
            </button>
          ))}

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-lg border border-black/10 hover:bg-black/5 transition-colors text-current cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      )}

      {/* Mobile Drawer Menu Dropdown */}
      {!isMobile && isMobileMenuOpen && (
        <div className={`absolute top-full left-0 w-full p-4 border-b flex flex-col space-y-2 shadow-lg backdrop-blur-xl z-40 md:hidden ${
          isCyber
            ? 'bg-[#090d16]/98 border-cyan-500/30 text-white font-mono'
            : isBento
            ? 'bg-white/98 border-slate-200 text-slate-900'
            : isBrutalist
            ? 'bg-[#FFFDF5] border-b-3 border-black text-black font-black'
            : 'bg-[#FDFBF7]/98 border-[#E7DEC8] text-[#2C2621] font-serif'
        }`}>
          <button
            type="button"
            onClick={scrollToTop}
            className="text-left px-3 py-2 text-xs font-bold rounded-lg hover:bg-black/5 transition-colors"
          >
            Home
          </button>
          <button
            type="button"
            onClick={scrollToStory}
            className="text-left px-3 py-2 text-xs font-bold rounded-lg hover:bg-black/5 transition-colors"
          >
            About
          </button>
          <button
            type="button"
            onClick={handleProjectsClick}
            className="text-left px-3 py-2 text-xs font-bold rounded-lg hover:bg-black/5 transition-colors"
          >
            Selected Works
          </button>
        </div>
      )}

    </header>
  );
}


