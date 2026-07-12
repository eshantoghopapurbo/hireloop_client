
import { LayoutSideContent, Bell, Envelope, Briefcase, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";


export function DashboardSideber() {
  const navItems = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "jobs" },
    { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Create A job" },
    { icon: Briefcase, href: "/dashboard/recruiter/company", label: "Company Profile" },
    { icon: Envelope, label: "Messages" },
    { icon: Person, label: "Profile" },
    { icon: Gear, label: "Settings" },
  ];

  const navContent = <nav className="flex flex-col gap-1">
    {navItems.map((item) => (
      <Link
        key={item.label}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-white text-sm  transition-colors hover:bg-default"
        href={item.href || "#"}
      >
        <item.icon className="size-5 text-white" />
        {item.label}
      </Link>
    ))}
  </nav>

  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0 bg-zinc-900 border-r border-zinc-800 min-h-screen p-4">
        {navContent}
      </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContent />
          sidebar
        </Button>
        <Drawer.Backdrop >
          <Drawer.Content placement="left">
            <Drawer.Dialog className="bg-zinc-900 text-white">
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body className="  text-white">
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}