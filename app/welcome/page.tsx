import { GetStartedButton } from "@/components/auth/GetStartedButton";

export default function Page() {
    return (
        <div className="flex items-center justify-center w-full h-dvh">
            <div className="flex justify-center gap-8 flex-col items-center">
                <h1 className="text-6xl font-bold">Inkference</h1>

                <GetStartedButton />
            </div>
        </div>
    );
}
