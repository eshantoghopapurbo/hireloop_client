
import { LayoutSideContent, Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

export function DashboardSideber() {
  const navItems = [
    { icon: House, label: "Home" },
    { icon: Magnifier, label: "Search" },
    { icon: Bell, label: "Notifications" },
    { icon: Envelope, label: "Messages" },
    { icon: Person, label: "Profile" },
    { icon: Gear, label: "Settings" },
  ];

  const navContent = <nav className="flex flex-col gap-1">
    {navItems.map((item) => (
      <button
        key={item.label}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-white text-sm  transition-colors hover:bg-default"
        type="button"
      >
        <item.icon className="size-5 text-white" />
        {item.label}
      </button>
    ))}
  </nav>

  return (
    <>
      <aside className="hidden w-64 lg:block bg-black-800 text-white min-h-screen p-4">
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