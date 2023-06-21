function Sidebar() {
  return (
    <aside
      className="fixed top-0 left-0 h-screen w-60 p-6 sm:w-60 dark:bg-gray-900 dark:text-gray-100"
      style={{ zIndex: 999 }}
    >
      <nav className="space-y-8 text-sm">
        <div className="space-y-2">
          <div className="flex flex-col space-y-1"></div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
