export function Header() {
  return (
    <div className="h-15 w-full bg-white flex fixed ">
      {" "}
      <h1 className="font-semibold text-2xl flex items-center text-black">
        Quiz app
      </h1>
      <div className="flex-1"></div>
      <div>
        {" "}
        <img className="flex items-center" src="avatar.svg" />
      </div>
    </div>
  );
}
