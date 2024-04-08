import Alpine from "alpinejs";
import collapse from '@alpinejs/collapse';
import focus from "@alpinejs/focus";
import ui from "@alpinejs/ui";

if (import.meta.env.MODE !== "production") {
	console.log(import.meta.env);
}

(async () => {
	Alpine.plugin(collapse);
	Alpine.plugin(focus);
	Alpine.plugin(ui);

	await import('./alpinejs');

	(window as any).Alpine = Alpine;
	Alpine.start();
})();