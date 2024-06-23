export interface ILocation {
    id: number;
    name: string;
    overviewInfoTexts?: IOverviewInfoText[],
    rooms: IRoom[];
  }
  
  export interface IRoom {
    id: number;
    name: string;
    bookings: IBooking[];
  }
  
  export interface IBooking {
    id: number;
    roomId: number;
    description: string;
    from: string;
    to: string;
  }
  
  export interface IOverviewInfoText {
    id: number;
    title: string;
    description: string;
    image?: string;
  }
  