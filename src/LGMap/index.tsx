import React, { useCallback, useRef, useState } from 'react';
import {
  InfoWindow,
  MultiLabel,
  MultiMarker,
  MultiPolyline,
  TMap,
} from 'tlbs-map-react';

// 类型定义
interface Position {
  lat: number;
  lng: number;
}

interface LogisticsPoint {
  position: Position;
  label: string;
  tooltip?: string;
}

interface LGMapProps {
  logisticsData: LogisticsPoint[];
  showLabel?: boolean;
  showTooltip?: boolean;
  showMarker?: boolean;
  enableMock?: boolean;
  apiKey: string;
  customMapOptions?: Record<string, any>;
  viewMode: string;
}

// 添加类型定义
interface CustomLabelGeometry {
  styleId: string;
  position: {
    lng: number;
    lat: number;
  };
  content: string;
}

// 样式配置
const STYLES = {
  multiMarkerStyle: {
    width: 20,
    height: 30,
    anchor: { x: 10, y: 30 },
  },
  multiLabelStyle1: {
    color: '#222222',
    size: 20,
  },
  multiLabelStyle2: {
    color: '#D54440',
    size: 20,
  },
} as const;

// 工具函数
const getMiddlePoints = (
  point1: LogisticsPoint,
  point2: LogisticsPoint,
): LogisticsPoint[] => {
  const count = Math.floor(Math.random() * 4) + 1;

  return Array(count)
    .fill(null)
    .map((_, i) => {
      const randomLat =
        (point1.position.lat + point2.position.lat) / 2 +
        (Math.random() - 0.5) * 0.01;
      const randomLng =
        (point1.position.lng + point2.position.lng) / 2 +
        (Math.random() - 0.5) * 0.01;

      return {
        position: { lat: randomLat, lng: randomLng },
        label: `随机中转站 ${i + 1}`,
        tooltip: `随机中转站 ${i + 1}`,
      };
    });
};

const LGMap: React.FC<LGMapProps> = ({
  logisticsData = [],
  showLabel = true,
  showTooltip = true,
  showMarker = true,
  enableMock = false,
  apiKey,
  viewMode = '3D',
  customMapOptions = {},
}) => {
  // 处理模拟数据
  const processedLogisticsData = React.useMemo(() => {
    if (enableMock && logisticsData.length === 2) {
      const middlePoints = getMiddlePoints(logisticsData[0], logisticsData[1]);
      return [logisticsData[0], ...middlePoints, logisticsData[1]];
    }
    return logisticsData;
  }, [enableMock, logisticsData]);

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const polylineRef = useRef(null);
  const [showControl, setShowControl] = useState(false);
  const [currentInfoWindow, setCurrentInfoWindow] = useState<string[]>([]);
  const [center] = useState(logisticsData[0]?.position);

  // 计算路线数据
  const routeGeometries = React.useMemo(
    () => [
      {
        styleId: 'polyline',
        paths: processedLogisticsData.map(({ position: { lat, lng } }) => ({
          lat,
          lng,
        })),
      },
    ],
    [processedLogisticsData],
  );

  // 计算标记数据
  const markerGeometries = React.useMemo(
    () =>
      showMarker
        ? processedLogisticsData.map(({ position: { lat, lng } }) => ({
            styleId: 'multiMarkerStyle1',
            position: { lng, lat },
          }))
        : [],
    [processedLogisticsData, showMarker],
  );

  // 计算文本数据
  const textGeometries = React.useMemo(
    () =>
      showLabel
        ? processedLogisticsData
            .filter((item) => item.label) // 先过滤掉没有 label 的数据
            .map(
              ({ position: { lat, lng }, label }): CustomLabelGeometry => ({
                styleId: 'multiLabelStyle1',
                position: { lng, lat },
                content: label,
              }),
            )
        : [],
    [processedLogisticsData, showLabel],
  );

  // 处理点击事件
  const handleMarkerClick = useCallback((event: any) => {
    const latLngStr = `${event.geometry.position.lat}-${event.geometry.position.lng}`;
    setCurrentInfoWindow((prev) =>
      prev.includes(latLngStr)
        ? prev.filter((str) => str !== latLngStr)
        : [...prev, latLngStr],
    );
  }, []);

  // 处理关闭弹窗
  const handleCloseInfoWindow = useCallback((latLngStr: string) => {
    setCurrentInfoWindow((prev) => prev.filter((str) => str !== latLngStr));
  }, []);

  return (
    <TMap
      options={{
        center,
        showControl,
        zoom: 18,
        viewMode,
        pitch: 70,
        rotation: 0,
        ...customMapOptions,
      }}
      ref={mapRef}
      apiKey={apiKey}
    >
      <MultiMarker
        ref={markerRef}
        styles={STYLES}
        geometries={markerGeometries}
        onClick={handleMarkerClick}
      />
      <MultiPolyline
        ref={polylineRef}
        styles={STYLES}
        geometries={routeGeometries}
      />
      <MultiLabel styles={STYLES} geometries={textGeometries} />

      {showTooltip &&
        processedLogisticsData.map((item, index) => {
          const latLngStr = `${item.position.lat}-${item.position.lng}`;
          return (
            <InfoWindow
              key={index}
              visible={currentInfoWindow.includes(latLngStr)}
              position={item.position}
              content={item.tooltip}
              onCloseclick={() => handleCloseInfoWindow(latLngStr)}
              options={{
                offset: { x: 0, y: -50 },
              }}
            />
          );
        })}
    </TMap>
  );
};

export default LGMap;
