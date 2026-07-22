
import { getUserSession } from "@/lib/core/session";
import { LayoutSideContent, Bell, Envelope, Briefcase, Gear, House, Magnifier, Person, Bookmark, FileText, CreditCard, } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export async function DashboardSideber() {
  const user = await getUserSession();

  const recruiterNavItems = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Create A Job" },
    { icon: Briefcase, href: "/dashboard/recruiter/company", label: "Company Profile" },
    { icon: Envelope, href: "/dashboard/recruiter/messages", label: "Messages" },
    { icon: Person, href: "/dashboard/recruiter/profile", label: "Profile" },
    { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
  ];

  const seekerNavItems = [
    { icon: House, href: "/dashboard/seeker", label: "Home" },
    { icon: Magnifier, href: "/dashboard/seeker/jobs", label: "Browse Jobs" },
    { icon: Bookmark, href: "/dashboard/seeker/saved-jobs", label: "Saved Jobs" },
    { icon: FileText, href: "/dashboard/seeker/applications", label: "Applications" },
    { icon: CreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
    { icon: Gear, href: "/dashboard/seeker/settings", label: "Settings" },
  ];

  const adminNavItems = [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Person, href: "/dashboard/admin/users", label: "Users" },
    { icon: Bookmark, href: "/dashboard/admin/companies", label: "Companies" },
    { icon: Briefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
    { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
    { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
  ];

  const navMapLinks = {
    recruiter: recruiterNavItems,
    seeker: seekerNavItems,
    admin: adminNavItems,
  };

  const role = user?.role || "seeker";
  const navItems = navMapLinks[role] || seekerNavItems;

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems?.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-white text-sm transition-colors hover:bg-zinc-800"
            href={item.href || "#"}
          >
            {IconComponent && <IconComponent className="size-5 text-white" />}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0 bg-zinc-900 border-r border-zinc-800 min-h-screen p-4">
        {navContent}
      </aside>

      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContent className="size-5" />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="bg-zinc-900 text-white">
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body className="text-white">
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}