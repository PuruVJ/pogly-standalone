import { useEffect } from "react";
import { useSpacetimeContext } from "../../Contexts/SpacetimeContext";
import Heartbeat from "../../module_bindings/heartbeat";
import { CanvasInitializedType } from "../../Types/General/CanvasInitializedType";

export const useHeartbeatEvents = (canvasInitialized: CanvasInitializedType) => {
  const { Identity } = useSpacetimeContext();

  useEffect(() => {
    if (!Identity || canvasInitialized.elementEventsInitialized) return;

    let internalBeat = 0;

    Heartbeat.onInsert((beat: Heartbeat) => {
      const isOverlay: Boolean = window.location.href.includes("/overlay");

      if (isOverlay && beat.tick === 1337) window.location.reload();
    });

    Heartbeat.onUpdate((oldElement, newElement, reducerEvent) => {
      internalBeat = newElement.tick;
    });
  }, [Identity, canvasInitialized.elementEventsInitialized]);
};
