export default function AiSelector({ value, onChange }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="px-5 py-3 mt-3
            text-lg
            rounded-xl
            border border-gray-600
            bg-black text-white
            min-w-[140px]
            hover:border-white
            focus:outline-none
            transition"
        >

            <option value="gemini">Gemini</option>
            <option value="groq">Groq</option>
        </select>
    );
}
