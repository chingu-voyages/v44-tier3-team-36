import LinesOnSidebar from "./LinesOnSidebar";

function Sidebar({ onSelectLine }) {
  return (
    <aside
      className="fixed top-6 left-6 h-5/8 w-60 p-8 sm:w-60 bg-white dark:bg-gray-900 text-center text-gray-900 dark:text-gray-100 rounded-lg shadow-lg"
      style={{ zIndex: 999 }}
    >
      <nav className="space-y-8 text-sm">
        <LinesOnSidebar onSelectLine={onSelectLine} />
      </nav>
    </aside>
  );
}

export default Sidebar;
