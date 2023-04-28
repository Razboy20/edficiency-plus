import Chrome from "chrome";

declare namespace chrome {
  export default Chrome;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const content: string;
  export default content;
}

declare global {
  interface Window {
    loggedIn: boolean;
    siteData: {
      urlroot: string;
      page: string;
      ajax: string;
      sitename: string;
      loggedin: string;
      multipleperiods: string;
      defaultsessionname: string;
      periodkeys: string;
      periodnames: string;
      isedficiency: string;
      isadmin: string;
      isteacher: string;
      isstudent: string;
      userid: string;
      tcrfeo: string;
      schoolcellenabled: string;
      usercellenabled: string;
      getsessionid: string;
      getperiodid: string;
      canaddsessions: string;
      caneditsessions: string;
      candeletesessions: string;
      blendedenabled: string;
      membergroups: string;
      urlparams: string;
      maxhotspots: string;
      upcominghotspots: string;
      homeFlex?: Block;
    };
  }
}
