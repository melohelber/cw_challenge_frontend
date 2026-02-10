export default function TypingIndicator() {
  return (
    <div className="flex justify-start px-4 py-2">
      <div className="rounded-2xl rounded-bl-md bg-white border border-gray-100 px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          <span className="typing-dot h-2 w-2 rounded-full bg-gray-400" />
          <span className="typing-dot h-2 w-2 rounded-full bg-gray-400" />
          <span className="typing-dot h-2 w-2 rounded-full bg-gray-400" />
        </div>
      </div>
    </div>
  );
}
