
export default function HomePage() {

  return (
    <>
      <Header />
      <div className="pageContainer">
        <ElementsPerPageDropDown />
        <Catalog />
        <Outlet />
      </div>
    </>
  );
}
