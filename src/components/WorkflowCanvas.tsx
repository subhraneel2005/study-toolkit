/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: FIX ANY TYPE ERROR

"use client";

import React, { useCallback, useRef } from "react";
import {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import DottedArrowEdge from "./DottedArrowEdge";
import AgentNode from "./AgentNode";
import WebSearchNode from "./WebSearchNode";
import ReportGeneratorNode from "./ReportGeneratorNode";
import EmptyState from "./EmptyMessage";
import PDFAgentNode from "./PdfNode";
import SummaryNode from "./SummaryNode";

const initialNodes: any[] = [];

const initialEdges: any[] = [];

const nodeTypes = {
  agentNode: AgentNode,
  pdfNode: PDFAgentNode,
  webSearchNode: WebSearchNode,
  summaryNode: SummaryNode,
  reportGeneratorNode: ReportGeneratorNode,
};

function InnerCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds: any) =>
        addEdge(
          {
            ...params,
            animated: true,
            markerEnd: {
              type: "arrowclosed",
              width: 30,
              height: 30,
            },
          },
          eds
        )
      ),
    []
  );

  const edgeTypes = {
    dottedArrow: DottedArrowEdge,
  };

  // Handle drop event
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const data = event.dataTransfer.getData("application/reactflow");
      if (!data) return;

      const { type, data: nodeData } = JSON.parse(data);

      // Calculate position on canvas
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Create new node
      const newNode = {
        id: `${Date.now()}`, // Generate unique ID
        type,
        position,
        data: {
          ...nodeData,
          isFirst: false,
          isLast: false,
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const updateNodeData = useCallback(
    (nodeId: string, newData: any) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...newData } }
            : node
        )
      );
    },
    [setNodes]
  );

  return (
    <div ref={reactFlowWrapper} className="w-full h-full relative">
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <EmptyState />
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodesConnectable={true}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        minZoom={0.3}
        maxZoom={1.5}
        panOnDrag
        zoomOnScroll
        zoomOnPinch
        zoomOnDoubleClick={false}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default function WorkflowCanvas() {
  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <InnerCanvas />
      </ReactFlowProvider>
    </div>
  );
}
