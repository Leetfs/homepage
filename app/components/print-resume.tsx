"use client";

export default function PrintResume() {
  return (
    <button className="resume-print" type="button" onClick={() => window.print()}>
      打印 / 保存 PDF <span aria-hidden="true">↗</span>
    </button>
  );
}
