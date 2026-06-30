export interface ICoachDetail {
  sn : number;
  admin_email: string;
  admin_name: string;
  admin_mobile:string;
  created_at: string;
  registered_as_main_admin: 0 | 1;
  registered_device_sn: 0 | 1;
}