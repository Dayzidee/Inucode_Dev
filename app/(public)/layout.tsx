import { PublicNavigation } from "../../components/shared/PublicNavigation";
import { GlobalFooter } from "../../components/shared/GlobalFooter";
import { ChatWidget } from "../../components/shared/ChatWidget";
import { ContactModal } from "../../components/shared/ContactModal";
import { ContactModalProvider } from "../../lib/context/ContactModalContext";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContactModalProvider>
      <div className="min-h-screen flex flex-col relative bg-surface text-on-surface font-sans overflow-x-hidden">
        <PublicNavigation />
        <div className="flex-1 flex flex-col lg:ml-0">
          <main className="flex-1">
            {children}
          </main>
          <GlobalFooter />
        </div>
        <ChatWidget />
        <ContactModal />
      </div>
    </ContactModalProvider>
  );
}
