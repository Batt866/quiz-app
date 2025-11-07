import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Genghis Khan",
    url: "#",
  },
  {
    title: "Figma ашиглах заавар",
    url: "#",
  },
  {
    title: "Санхүүгийн шийдвэрүүд",
    url: "#",
  },
  {
    title: "Figma-д загвар зохион бүтээх аргачлалууд",
    url: "#",
  },
  {
    title: "Санхүүгийн технологи 2023",
    url: "#",
  },
  {
    title: "Хэрэглэгчийн интерфейс дизайны шилдэг туршлага",
    url: "#",
  },
  {
    title: "Архитектур загварчлалын хөтөлбөрүүд",
    url: "#",
  },
  {
    title: "Эрүүл амьдралын хэв маяг",
    url: "#",
  },
  {
    title: "Технологийн салбарт хийгдэж буй инноваци",
    url: "#",
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="mt-15">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-28px text-black not-italic text-xl">
            History
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex gap-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="text-black ">
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
