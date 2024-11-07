export class Medicine {
  constructor(
    public medication_id: number | string,
    public name: string,
    public isFavorite: boolean,
    public duration: boolean,
    public frequency: boolean,
    public frequency_option: boolean,

  ) {}
}
