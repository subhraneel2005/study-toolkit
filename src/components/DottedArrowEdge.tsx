/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: FIX ANY TYPE ERROR

import { BaseEdge, getBezierPath } from "@xyflow/react";
const DottedArrowEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: any) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
        </marker>
      </defs>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: "#3b82f6",
          strokeWidth: 2,
          strokeDasharray: "5 5",
          ...style,
        }}
        markerEnd="url(#arrowhead)"
      />
    </>
  );
};
export default DottedArrowEdge;
