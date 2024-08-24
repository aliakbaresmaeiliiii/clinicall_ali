export interface Calendar {
    date: Date;
    title: string;
    isPastDate: boolean;
    isToday: boolean;
    describe: string;
    dataList: DataList[];
  }
  
  export interface DataList {
    title: string;
    describe: string;
    selectedColor: string;
  }
  