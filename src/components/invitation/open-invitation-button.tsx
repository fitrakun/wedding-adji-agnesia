"use client";

export function OpenInvitationButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button className="canva-button" type="button" onClick={onOpen} data-opening-item>
      Buka undangan
    </button>
  );
}
