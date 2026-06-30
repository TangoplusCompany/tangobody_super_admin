export interface IMeasureResponse {
  measurement_meta: IMeasurementMeta
  basic_result ?: IMeasureBasic 
  rom_result ?: IRomItemDetail[]
  bia_result ?: IMeasureBia
}
export interface IMeasurementMeta {
  user_sn: number | string; // sn
  device_sn: number | string; // 장치 sn
  measure_sn: number | string; // t_measure_info_sn
  user_name: string; // 유저 이름
  measure_date: string; // 측정일자
  gender: string;
  user_uuid: string; // 유저 UUID
  mobile: string; // 휴대폰 번호
  camera_orientation: 0 | 1;
  has_basic : 0 | 1;
  has_rom : 0 | 1;
  has_bia: 0 | 1;
}

export interface IMeasureBasic {
  result_summary_data: IMeasureInfo;
  static_mat_data: IStaticMat;
  dynamic_mat_data: IDynamicMat;
  detail_data: IBasicPartDetail;
}

export interface IMeasureInfo
  extends IMeasureUserRisk,
    IMeasureRiskLevel,
    IMeasureRangeLevel,
    IMeasureUpperLowerMent,
    IMeasureUpperLowerLevel,
    IMatStatic,
    IMatOhs,
    IMeasurementMeta {}


export interface IMeasureUserRisk {
  risk_neck: number; // 통증부위 목
  risk_shoulder_left: number; // 통증부위 어깨
  risk_shoulder_right: number; // 통증부위 어깨
  risk_elbow_right: number; // 통증부위 팔꿈치
  risk_elbow_left: number; // 통증부위 팔꿈치
  risk_wrist_left: number; // 통증부위 손목
  risk_wrist_right: number; // 통증부위 손목
  risk_hip_left: number; // 통증부위 고관절
  risk_hip_right: number; // 통증부위 고관절
  risk_knee_left: number; // 통증부위 무릎
  risk_knee_right: number; // 통증부위 무릎
  risk_ankle_right: number; // 통증부위 발목
  risk_ankle_left: number; // 통증부위 발목
}

export interface IMeasureRiskLevel {
  risk_level_neck: number;
  risk_level_shoulder: number; 
  risk_level_elbow: number; 
  risk_level_hip: number; 
  risk_level_knee: number; 
  risk_level_ankle: number; 
}


export interface IMeasureRangeLevel {
  range_level_neck: number;
  range_level_shoulder: number;
  range_level_elbow: number;
  range_level_hip: number;
  range_level_knee: number;
  range_level_ankle: number;
}
export interface IMeasureUpperLowerMent {
  risk_upper_ment: string;
  risk_lower_ment: string;
}

export interface IMeasureUpperLowerLevel {
  risk_upper_risk_level: string;
  risk_upper_range_level: string;
  risk_lower_risk_level: string;
  risk_lower_range_level: string;
}
export interface IMatStatic {
  mat_static_horizontal_ment: string;
  mat_static_vertical_ment: string;
  mat_static_risk_level: string;
  mat_static_range_level: string;
  mat_static_left_top: number;
  mat_static_left_bottom: number;
  mat_static_right_top: number;
  mat_static_right_bottom: number;
  mat_static_left_pressure: number;
  mat_static_right_pressure: number;
  mat_static_top_pressure: number;
  mat_static_bottom_pressure: number;
}

export interface IMatOhs {
  mat_ohs_horizontal_ment: string;
  mat_ohs_vertical_ment: string;
  mat_ohs_knee_ment: string;
  mat_ohs_left_top: number;
  mat_ohs_left_bottom: number;
  mat_ohs_right_top: number;
  mat_ohs_right_bottom: number;
  mat_ohs_left_pressure: number;
  mat_ohs_right_pressure: number;
  mat_ohs_top_pressure: number;
  mat_ohs_bottom_pressure: number;
}

export interface IStaticMat {
  measure_server_mat_image_name: string;
  measure_server_mat_json_name: string;
  mat_static_horizontal_ment: string;
  mat_static_vertical_ment: string;
}

export interface IDynamicMat {
  mat_hip_down_image_name: string;
  mat_hip_trajectory_image_name: string;
  mat_left_knee_trajectory_image_name: string;
  mat_right_knee_trajectory_image_name: string;
  mat_ohs_horizontal_ment: string;
  mat_ohs_vertical_ment: string;
  mat_ohs_knee_ment: string;
}

export interface IBasicPartDetail {
  neck: IBasicPartItem;
  shoulder: IBasicPartItem;
  elbow: IBasicPartItem;
  hip: IBasicPartItem;
  knee: IBasicPartItem;
  ankle: IBasicPartItem;
}
export type IBasicPartItem = {
  [measureName: string]: IBasicPart;
};

export interface IBasicPart {
  measure_type: number;
  landmark: number;
  data: number;
  risk_level: number;
  range_level: number;
  measure_unit: string;
}
// ☀️☀️☀️☀️☀️☀️관절가동범위☀️☀️☀️☀️☀️☀️

export interface IRomHistoryItem extends IRomItem {
  center_name: string;
  device_name: string;
  opposite_side_rom_sn: number;
  opposite_measure_type: number;
}

export interface IRomCount {
  total_count: number;
  bad_score_count: number;
  warning_score_count:number;
  normal_score_count: number;
  good_score_count: number;
}

// export interface IRomTypeItem extends IRomItemCardData {
//   sn: number;
//   measure_sn: number;
//   user_name: number;
//   reg_date: string;
//   title: string;
//   howto: string;
//   measure_seq: number;
//   measure_type: number;
//   score: number;
//   history_by_measure_type: Record<string, number>;
//   measurement_count: number;
// }

export interface IRomItem extends IRomItemCardData {
  sn: number;
  measure_sn: number;
  user_name: number;
  reg_date: string;
  title: string;
  howto: string;
  measure_seq: number;
  measure_type: number;
  score: number;
  history_by_measure_type: Record<string, number>;
}

export interface IRomItemCardData extends IRomItemRangeData {
  score: number; 
  description: string;
  value_1_min: number;
  value_1_max: number;
  value_2_min: number;
  value_2_max: number;
}

export interface IRomItemRangeData {
  normal_bad: number;
  normal_warning: number;
  normal_normal: number;
  max_value: number;
}
export interface IRomGraphJson {
  values : number[];
  values2 : number[];
}


export interface IRomItemDetail extends IRomItemCardData {
  sn: number;
  device_sn: number;
  server_sn: number;
  user_uuid: string;
  user_sn: number;
  user_name: string;
  measure_seq: number;
  measure_type: number;
  reg_date: string;
  measure_start_time: string;
  measure_end_time:string;
  measure_photo_file_name: string;
  measure_overlay_width: number;
  measure_overlay_height: number;
  measure_overlay_scale_factor_x: number;
  measure_overlay_scale_factor_y: number;
  measure_server_file_name: string;
  measure_server_json_name: string;
  measure_server_mat_json_name: string;
  measure_server_data_json_name: string;
  result_index: number;
  uploaded: string;
  upload_date: string;
  uploaded_json: string;
  uploaded_file: string;
  uploaded_json_fail: string;
  uploaded_file_fail: string;
  used: string;
  uploaded_mat_json: number;
  uploaded_rom_json: string;
  title: string;
  howto: string;
  camera_orientation: 0 | 1; 
}

// export interface IRomItemRawData {
//   front_neck_left_down_angle_center_shoulder_nose: number;
//   front_neck_left_down_angle_upper_shoulder_shoulder_nose: number;
//   front_neck_left_down_angle_shoulder_center_shoulder_nose: number;
//   front_neck_left_down_velocity: number;
//   front_neck_right_down_angle_center_shoulder_nose: number;
//   front_neck_right_down_angle_upper_shoulder_shoulder_nose: number;
//   front_neck_right_down_angle_shoulder_center_shoulder_nose: number;
//   front_neck_right_down_velocity: number;
//   front_shoulder_left_up_angle_under_shoulder_shoulder_wrist: number;
//   front_shoulder_left_up_angle_under_shoulder_shoulder_elbow: number;
//   front_shoulder_left_up_angle_shoulder_elbow_wrist: number;
//   front_shoulder_left_up_velocity: number;
//   front_shoulder_right_up_angle_under_shoulder_shoulder_wrist: number;
//   front_shoulder_right_up_angle_under_shoulder_shoulder_elbow: number;
//   front_shoulder_right_up_angle_shoulder_elbow_wrist: number;
//   front_shoulder_right_up_velocity: number;
//   front_upper_body_left_down_angle_center_hip_center_shoulder: number;
//   front_upper_body_left_down_angle_upper_hip_center_hip_center_sho: number;
//   front_upper_body_left_down_angle_shoulder: number;
//   front_upper_body_left_down_angle_shoulder_3_point: number;
//   front_upper_body_left_down_velocity: number;
//   front_upper_body_right_down_angle_center_hip_center_shoulder: number;
//   front_upper_body_right_down_angle_upper_hip_center_hip_center_sh: number;
//   front_upper_body_right_down_angle_shoulder: number;
//   front_upper_body_right_down_angle_shoulder_3_point: number;
//   front_upper_body_right_down_velocity: number;
//   front_leg_left_up_angle_under_hip_hip_ankle: number;
//   front_leg_left_up_angle_under_hip_hip_knee: number;
//   front_leg_left_up_angle_hip_knee_ankle: number;
//   front_leg_left_up_angle_hip_ankle: number;
//   front_leg_left_up_angle_hip_knee: number;
//   front_leg_left_up_velocity: number;
//   front_leg_right_up_angle_under_hip_hip_ankle: number;
//   front_leg_right_up_angle_under_hip_hip_knee: number;
//   front_leg_right_up_angle_hip_knee_ankle: number;
//   front_leg_right_up_angle_hip_ankle: number;
//   front_leg_right_up_angle_hip_knee: number;
//   front_leg_right_up_velocity: number;
//   side_left_neck_down_angle_hip_ear: number;
//   side_left_neck_down_angle_shoulder_ear: number;
//   side_left_neck_down_angle_upper_hip_hip_ear: number;
//   side_left_neck_down_angle_upper_shoulder_shoulder_ear: number;
//   side_left_neck_down_velocity: number;
//   side_left_neck_up_angle_hip_ear: number;
//   side_left_neck_up_angle_shoulder_ear: number;
//   side_left_neck_up_angle_upper_hip_hip_ear: number;
//   side_left_neck_up_angle_upper_shoulder_shoulder_ear: number;
//   side_left_neck_up_velocity: number;
//   side_left_shoulder_up_angle_under_shoulder_shoulder_wrist: number;
//   side_left_shoulder_up_angle_under_shoulder_shoulder_elbow: number;
//   side_left_shoulder_up_angle_shoulder_elbow_wrist: number;
//   side_left_shoulder_up_angle_shoulder_wrist: number;
//   side_left_shoulder_up_angle_shoulder_elbow: number;
//   side_left_shoulder_up_velocity: number;
//   side_left_shoulder_back_angle_under_shoulder_shoulder_wrist: number;
//   side_left_shoulder_back_angle_under_shoulder_shoulder_elbow: number;
//   side_left_shoulder_back_angle_shoulder_elbow_wrist: number;
//   side_left_shoulder_back_angle_shoulder_wrist: number;
//   side_left_shoulder_back_angle_shoulder_elbow: number;
//   side_left_shoulder_back_velocity: number;
//   side_left_elbow_wrist_rotate_up_angle_elbow_wrist: number;
//   side_left_elbow_wrist_rotate_up_angle_horizontal_elbow_elbow_wri: number;
//   side_left_elbow_wrist_rotate_up_velocity: number;
//   side_left_elbow_wrist_rotate_down_angle_elbow_wrist: number;
//   side_left_elbow_wrist_rotate_down_angle_horizontal_elbow_elbow_w: number;
//   side_left_elbow_wrist_rotate_down_velocity: number;
//   side_left_elbow_wrist_up_angle_under_elbow_elbow_wrist: number;
//   side_left_elbow_wrist_up_angle_shoulder_elbow_wrist: number;
//   side_left_elbow_wrist_up_velocity: number;
//   side_left_upper_body_down_angle_under_hip_hip_shoulder: number;
//   side_left_upper_body_down_angle_hip_shoulder: number;
//   side_left_upper_body_down_angle_hip_shoulder_wrist: number;
//   side_left_upper_body_down_angle_hip_knee_ankle: number;
//   side_left_upper_body_down_angle_knee_hip_shoulder: number;
//   side_left_upper_body_down_distance_toe_mid_finger: number;
//   side_left_upper_body_down_distance_toe_index_finger: number;
//   side_left_upper_body_down_velocity: number;
//   side_left_upper_body_back_angle_upper_hip_hip_shoulder: number;
//   side_left_upper_body_back_angle_hip_shoulder: number;
//   side_left_upper_body_back_angle_upper_hip_waist_shoulder: number;
//   side_left_upper_body_back_velocity: number;
//   side_left_leg_up_angle_under_hip_hip_ankle: number;
//   side_left_leg_up_angle_under_hip_hip_knee: number;
//   side_left_leg_up_angle_hip_knee_ankle: number;
//   side_left_leg_up_angle_hip_ankle: number;
//   side_left_leg_up_velocity: number;
//   side_left_leg_back_angle_under_hip_hip_ankle: number;
//   side_left_leg_back_angle_under_hip_hip_knee: number;
//   side_left_leg_back_angle_hip_knee_ankle: number;
//   side_left_leg_back_angle_hip_ankle: number;
//   side_left_leg_back_velocity: number;
//   side_left_knee_up_angle_under_knee_knee_ankle: number;
//   side_left_knee_up_angle_knee_ankle: number;
//   side_left_knee_up_velocity: number;
//   side_left_foot_up_angle_knee_ankle_toe: number;
//   side_left_foot_up_velocity: number;
//   side_left_foot_down_angle_knee_ankle_toe: number;
//   side_left_foot_down_velocity: number;
//   side_right_neck_down_angle_hip_ear: number;
//   side_right_neck_down_angle_shoulder_ear: number;
//   side_right_neck_down_angle_upper_hip_hip_ear: number;
//   side_right_neck_down_angle_upper_shoulder_shoulder_ear: number;
//   side_right_neck_down_velocity: number;
//   side_right_neck_up_angle_hip_ear: number;
//   side_right_neck_up_angle_shoulder_ear: number;
//   side_right_neck_up_angle_upper_hip_hip_ear: number;
//   side_right_neck_up_angle_upper_shoulder_shoulder_ear: number;
//   side_right_neck_up_velocity: number;
//   side_right_shoulder_up_angle_under_shoulder_shoulder_wrist: number;
//   side_right_shoulder_up_angle_under_shoulder_shoulder_elbow: number;
//   side_right_shoulder_up_angle_shoulder_elbow_wrist: number;
//   side_right_shoulder_up_angle_shoulder_wrist: number;
//   side_right_shoulder_up_angle_shoulder_elbow: number;
//   side_right_shoulder_up_velocity: number;
//   side_right_shoulder_back_angle_under_shoulder_shoulder_wrist: number;
//   side_right_shoulder_back_angle_under_shoulder_shoulder_elbow: number;
//   side_right_shoulder_back_angle_shoulder_elbow_wrist: number;
//   side_right_shoulder_back_angle_shoulder_wrist: number;
//   side_right_shoulder_back_angle_shoulder_elbow: number;
//   side_right_shoulder_back_velocity: number;
//   side_right_elbow_wrist_rotate_up_angle_elbow_wrist: number;
//   side_right_elbow_wrist_rotate_up_angle_horizontal_elbow_elbow_wr: number;
//   side_right_elbow_wrist_rotate_up_velocity: number;
//   side_right_elbow_wrist_rotate_down_angle_elbow_wrist: number;
//   side_right_elbow_wrist_rotate_down_angle_horizontal_elbow_elbow_: number;
//   side_right_elbow_wrist_rotate_down_velocity: number;
//   side_right_elbow_wrist_up_angle_under_elbow_elbow_wrist: number;
//   side_right_elbow_wrist_up_angle_shoulder_elbow_wrist: number;
//   side_right_elbow_wrist_up_velocity: number;
//   side_right_upper_body_down_angle_under_hip_hip_shoulder: number;
//   side_right_upper_body_down_angle_hip_shoulder: number;
//   side_right_upper_body_down_angle_hip_shoulder_wrist: number;
//   side_right_upper_body_down_angle_hip_knee_ankle: number;
//   side_right_upper_body_down_angle_knee_hip_shoulder: number;
//   side_right_upper_body_down_distance_toe_mid_finger: number;
//   side_right_upper_body_down_distance_toe_index_finger: number;
//   side_right_upper_body_down_velocity: number;
//   side_right_upper_body_back_angle_upper_hip_hip_shoulder: number;
//   side_right_upper_body_back_angle_hip_shoulder: number;
//   side_right_upper_body_back_angle_upper_hip_waist_shoulder: number;
//   side_right_upper_body_back_velocity: number;
//   side_right_leg_up_angle_under_hip_hip_ankle: number;
//   side_right_leg_up_angle_under_hip_hip_knee: number;
//   side_right_leg_up_angle_hip_knee_ankle: number;
//   side_right_leg_up_angle_hip_ankle: number;
//   side_right_leg_up_velocity: number;
//   side_right_leg_back_angle_under_hip_hip_ankle: number;
//   side_right_leg_back_angle_under_hip_hip_knee: number;
//   side_right_leg_back_angle_hip_knee_ankle: number;
//   side_right_leg_back_angle_hip_ankle: number;
//   side_right_leg_back_velocity: number;
//   side_right_knee_up_angle_under_knee_knee_ankle: number;
//   side_right_knee_up_angle_knee_ankle: number;
//   side_right_knee_up_velocity: number;
//   side_right_foot_up_angle_knee_ankle_toe: number;
//   side_right_foot_up_velocity: number;
//   side_right_foot_down_angle_knee_ankle_toe: number;
//   side_right_foot_down_velocity: number;
//   back_left_apley_distance_mid_finger: number;
//   back_left_apley_distance_index_finger: number;
//   back_left_apley_angle_left_shoulder_elbow_wrist: number;
//   back_left_apley_angle_right_shoulder_elbow_wrist: number;
//   back_right_apley_distance_mid_finger: number;
//   back_right_apley_distance_index_finger: number;
//   back_right_apley_angle_left_shoulder_elbow_wrist: number;
//   back_right_apley_angle_right_shoulder_elbow_wrist: number;
// }

// ☀️☀️☀️☀️☀️☀️체성분☀️☀️☀️☀️☀️☀️

export interface IMeasureBia extends IBiaInfo, IBiaComposition, IBiaMainAnalysis, IBiaBodyPart, IBiaRecommend, IBiaBodyBenchmark, IBiaMostPreviousData, IBiaHistoryDatas {}

export interface IBiaPrevious {
  measure_date: string;
  measure_server_sn: number;
  weight: number;
  weight_std_min: number;
  weight_std_max: number;

  moisture_content: number;
  moisture_content_std_min: number;
  moisture_content_std_max: number;
  body_fat_mass: number;
  body_fat_mass_std_min: number;
  body_fat_mass_std_max: number;
  protein_mass: number;
  protein_mass_std_min: number;
  protein_mass_std_max: number;
  amount_of_inorganic_salt: number;
  amount_of_inorganic_salt_std_min: number;
  amount_of_inorganic_salt_std_max: number;
  skeletal_muscle_mass_index: number;

  right_hand_fat_mass: number;
  left_hand_fat_mass: number;
  trunk_fat_mass: number;
  right_foot_fat_mass: number;
  left_foot_fat_mass: number;
  
  right_hand_fat_percentage: number;
  left_hand_fat_percentage: number;
  trunk_fat_percentage: number;
  right_foot_fat_percentage: number;
  left_foot_fat_percentage: number;

  right_hand_muscle_mass: number;
  left_hand_muscle_mass: number;
  trunk_muscle_mass: number;
  right_foot_muscle_mass: number;	
  left_foot_muscle_mass: number;	
  right_hand_muscle_ratio: number;
  left_hand_muscle_ratio: number;
  trunk_muscle_ratio: number;
  right_foot_muscle_ratio: number;
  left_foot_muscle_ratio: number;
  
}

export interface IBiaMostPreviousData {
  most_previous_data: IBiaPrevious
}

export interface IBiaInfo {
  user_sn: number;
  user_name: string;
  bia_version: number;
  ws_stable_weight_kg: number;
  br_input_height: number;
  br_input_age: number;
  br_input_gender: number;
  measure_date: string;
  history_data_count: number;
}

export interface IBiaComposition {
    // 체중
  weight: number;
  weight_std_min: number;
  weight_std_max: number;

  moisture_content: number;
  moisture_content_std_min: number;
  moisture_content_std_max: number;
  body_fat_mass: number;
  body_fat_mass_std_min: number;
  body_fat_mass_std_max: number;
  protein_mass: number;
  protein_mass_std_min: number;
  protein_mass_std_max: number;
  amount_of_inorganic_salt: number;
  amount_of_inorganic_salt_std_min: number;
  amount_of_inorganic_salt_std_max: number;

  result_body_composition_description: string;
  result_body_fat_mass_grade: string;
  result_weight_grade:string;

}

export interface IBiaHistoryDatas {
  history_data: IBiaHistoryData[]
}

// 하단 잔디 그래프를 위해 재선언 
export interface IBiaHistoryData {
  body_score: number;
  skeletal_muscle_mass_index: number;
  weight: number;
  skeletal_muscle_mass: number;
  lean_body_weight: number;
  measure_date: string;
}


export interface IBiaMainAnalysis {
  result_cid_type: number;
  result_cid_comment: string;

  result_skeletal_muscle_mass_grade: number;
  result_body_fat_percentage_grade: number;
  result_extracellular_water_grade: number;
  result_basal_metabolism_kcal_grade: number;
  skeletal_muscle_mass_index: number;
  result_smi_grade: number;

  skeletal_muscle_mass: number;
  skeletal_muscle_mass_std_min: number;
  skeletal_muscle_mass_std_max: number;
  
  result_body_water_grade: number;
  result_protein_grade: number;
  result_mineral_grade: number;

  // 내장지방 위험지수
  visceral_fat_level: number;
  visceral_fat_level_std_min: number;
  visceral_fat_level_std_max: number;
  result_visceral_fat_level_grade: number;

  extracellular_water_volume: number;
  extracellular_water_volume_std_min: number;
  extracellular_water_volume_std_max: number;
  body_fat_percentage: number;
  body_fat_percentage_std_min: number;
  body_fat_percentage_std_max: number;
  basal_metabolism_kcal: number;
  basal_metabolism_kcal_std_min: number;
  basal_metabolism_kcal_std_max: number;
  bmi:number;
  bmi_std_min:number;
  bmi_std_max: number;
}

export interface IBiaBodyPart {
  right_hand_fat_mass: number;
  left_hand_fat_mass: number;
  trunk_fat_mass: number;
  right_foot_fat_mass: number;
  left_foot_fat_mass: number;
  
  right_hand_fat_percentage: number;
  left_hand_fat_percentage: number;
  trunk_fat_percentage: number;
  right_foot_fat_percentage: number;
  left_foot_fat_percentage: number;

  right_hand_muscle_mass: number;
  left_hand_muscle_mass: number;
  trunk_muscle_mass: number;
  right_foot_muscle_mass: number;	
  left_foot_muscle_mass: number;	
  right_hand_muscle_ratio: number;
  left_hand_muscle_ratio: number;
  trunk_muscle_ratio: number;
  right_foot_muscle_ratio: number;
  left_foot_muscle_ratio: number;

  fat_std_right_hand: number;
  fat_std_left_hand: number;
  fat_std_trunk: number;
  fat_std_right_foot: number;
  fat_std_left_foot: number;
  muscle_std_right_hand: number;
  muscle_std_left_hand: number;
  muscle_std_trunk: number;
  muscle_std_right_foot: number;
  muscle_std_left_foot: number;

}

export interface IBiaRecommend {
  exer_kcal_walk: number;
  exer_kcal_golf: number;
  exer_kcal_croquet: number;
  exer_kcal_tennis_cycling_basketball: number;
  exer_kcal_squash_bouncyball_taekwondo_fencing: number;
  exer_kcal_climb_mountains: number;
  exer_kcal_swimming_aerobics_jogging_football_skippingrope: number;
  exer_kcal_badminton_tabletennis: number;

  result_nutrition_title: string;
  result_nutrition_description: string;
  result_nutrition_grade: number;
  result_exercise_title: string;
  result_exercise_description: string;
  result_exercise_grade: number;
  result_habits_title: string;
  result_habits_description: string;
  result_habits_grade: number;

}
// 주요 건강 지표 + 바디타입 세부 분석
export interface IBiaBodyBenchmark {
  body_score: number;
  physical_age: number;
  body_type	: number;
  result_body_type_description: string;
  recommended_intake_kcal: number;
  ideal_weight: number;
  target_weight: number;
  weight_control: number;
  muscle_control: number;
  fat_control_amount: number;

  
  // 제지방
  lean_body_weight: number;
  lean_body_weight_std_min: number;
  lean_body_weight_std_max: number;
  // 근육량
  muscle_mass: number;
  muscle_mass_std_min: number;
  muscle_mass_std_max: number;
  // 골량
  bone_mass: number;
  bone_mass_std_min: number;
  bone_mass_std_max: number;
  // 세포질량
  body_cell_mass: number;
  body_cell_mass_std_min: number;
  body_cell_mass_std_max: number;
  subcutaneous_fat_mass: number;
  
  // 복부/내장지방 관련
  waist_to_hip_ratio: number;
  waist_to_hip_ratio_std_min: number;
  waist_to_hip_ratio_std_max: number;
  // 세포내수분비
  intracellular_water_volume: number;
  intracellular_water_volume_std_min: number;
  intracellular_water_volume_std_max: number;
  // 표준 체중 대비 체중 비율 
  obesity_percentage: number;
  obesity_percentage_std_min: number;
  obesity_percentage_std_max: number;
  // 피하지방
  subcutaneous_fat_rate: number;
  subcutaneous_fat_rate_std_min: number;
  subcutaneous_fat_rate_std_max: number;
  

}
