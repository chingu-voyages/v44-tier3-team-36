import Map from "$lib/Map/Map";
import Navigation from "$lib/NavBar/NavBar";

function Root() {
  return (
    <main className="flex flex-col h-screen w-full justify-center">
      <Navigation
        /* @ts-ignore */
        Extra={
          <div
            className="login rounded-md text-white font-semibold px-8 py-1 cursor-pointer hover:opacity-90"
            style={{ background: "#2C8EB5" }}
          >
            Login
          </div>
        }
      />

      <Map />
    </main>
  );
}

export default Root;
