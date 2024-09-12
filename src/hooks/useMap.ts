import { reactive } from "vue";
import * as echarts from "echarts";
import { getGeojson } from "@/apis/index";
import bus from "@/views/Tools/bus";

export const useMap = (
  setOption: (options: echarts.EChartsOption, opts?: echarts.SetOptionOpts) => void,
  resetLineData: () => void,
) => {
  // 当前地图信息
  const currentMap = reactive({
    name: "中国",
    adcode: 100000,
    navList: [{ name: "中国", adcode: 100000, level: "province" }],
  });
  // 地区code映射
  const adcodeMap: Record<string, { adcode: number; level: string; mapColor:number }> = {};
  // 生成地图code映射
  const genAdcodeMap = (features: any[]) => {
    features.forEach((feature) => {
      const { name, adcode, level } = feature.properties;
      const formattedName = name.replace(/省$/, '');
      const mapColor= parseInt(String(adcode/400000));
      console.debug(parseInt(String(adcode/400000)));
      adcodeMap[formattedName] = { adcode, level,mapColor };
    });
  };
  // 注册地图
  const registerMap = async (mapInfo?: { name: string; adcode: number }) => {
    const _mapInfo = mapInfo ?? currentMap;
    if (echarts.getMap(_mapInfo.name)) return;
    await getGeojson(_mapInfo.adcode).then((geoJSON: any) => {
      genAdcodeMap(geoJSON.features);
      echarts.registerMap(_mapInfo.name, geoJSON);
    });
  };
  // 获取地图信息
  const getMapInfo = (name?: string) => {
    const _name = name ?? currentMap.name;
    return echarts.getMap(_name);
  };
  // 地图点击回调
  const handleMapClick = (params: any) => {
    const name = params.name; // 点击区域的名称
    const formattedName = name.replace(/省$/, ''); // 去掉名称中的“省”字
    const { adcode, level } = adcodeMap[formattedName];
    // 输出省份和市
    if (level === "district") {
      console.log(params.name);
      bus.emit("prvc", params.name);
    } else if (level === "province") {
      console.log(params.name);
      bus.emit("prvc", params.name);
    } else {
      console.log(params);
    }
    if (level === "district") return;
    resetLineData();
    registerMap({ name: formattedName, adcode }).then(() => {
      currentMap.name = formattedName;
      currentMap.adcode = adcode;
      currentMap.navList.push({ name: formattedName, adcode, level });
      setOption({ geo: { map: formattedName, zoom: 1, center: undefined }, series: [{ data: [] }, { data: [] }] });
    });
  };
  // 地图层级切换回调
  const handleLevelChange = (params: (typeof currentMap.navList)[number], index: number) => {
    const formattedName = params.name.replace(/省$/, ''); // 去掉名称中的“省”字
    currentMap.navList.splice(index + 1, 9);
    currentMap.name = formattedName;
    currentMap.adcode = params.adcode;
    resetLineData();
    setOption({ geo: { map:formattedName, zoom: 1, center: undefined }, series: [{ data: [] }, { data: [] }] });
  };

  return {
    currentMap,
    adcodeMap,
    registerMap,
    getMapInfo,
    handleMapClick,
    handleLevelChange,
  };
};
