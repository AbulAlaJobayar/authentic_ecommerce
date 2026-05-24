// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Search, X } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import {
//   Laptop,
//   Shirt,
//   Tag,
//   Home,
//   Dumbbell,
//   AlertTriangle,
//   CheckCircle2,
// } from "lucide-react";

// // ======================
// // TYPES
// // ======================

// type Category = { id: string; name: string };

// type InventoryFilterBarProps = {
//   search: string;
//   onSearchChange: (val: string) => void;
//   statusFilters: Set<string>;
//   onToggleStatus: (val: string) => void;
//   categoryFilters: Set<string>;
//   categories: Category[];
//   onToggleCategory: (id: string) => void;
//   stockFilter: Set<string>;
//   onToggleStock: (val: string) => void;
//   onRemoveFilter: (group: "status" | "category" | "stock", val: string) => void;
//   onClearAll: () => void;
//   inventory: any[];
// };

// // ======================
// // STATUS CONFIG
// // ======================

// const STATUS_OPTIONS = [
//   {
//     value: "ACTIVE",
//     label: "Active",
//     dotClass: "bg-green-500",
//     activeClass:
//       "bg-green-700 text-white border-green-700 hover:bg-green-700",
//   },
//   {
//     value: "DRAFT",
//     label: "Draft",
//     dotClass: "bg-amber-500",
//     activeClass:
//       "bg-amber-700 text-white border-amber-700 hover:bg-amber-700",
//   },
//   {
//     value: "DISCONTINUED",
//     label: "Discontinued",
//     dotClass: "bg-red-500",
//     activeClass: "bg-red-700 text-white border-red-700 hover:bg-red-700",
//   },
// ];

// // ======================
// // STOCK CONFIG
// // ======================

// const STOCK_OPTIONS = [
//   {
//     value: "low",
//     label: "Low stock",
//     icon: AlertTriangle,
//     activeClass:
//       "bg-amber-700 text-white border-amber-700 hover:bg-amber-700",
//   },
//   {
//     value: "ok",
//     label: "In stock",
//     icon: CheckCircle2,
//     activeClass:
//       "bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-700",
//   },
// ];

// // ======================
// // CATEGORY ICON MAP
// // ======================

// const CATEGORY_ICONS: Record<string, React.ElementType> = {
//   Electronics: Laptop,
//   Apparel: Shirt,
//   Accessories: Tag,
//   Home: Home,
//   Sports: Dumbbell,
// };

// // ======================
// // CHIP COMPONENT
// // ======================

// const FilterChip = ({
//   active,
//   activeClass,
//   onClick,
//   children,
// }: {
//   active: boolean;
//   activeClass: string;
//   onClick: () => void;
//   children: React.ReactNode;
// }) => (
//   <button
//     onClick={onClick}
//     className={cn(
//       "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 cursor-pointer select-none whitespace-nowrap",
//       active
//         ? activeClass
//         : "bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground hover:bg-muted/50"
//     )}
//   >
//     {children}
//   </button>
// );

// // ======================
// // ACTIVE TAG COMPONENT
// // ======================

// const ActiveTag = ({
//   label,
//   onRemove,
// }: {
//   label: string;
//   onRemove: () => void;
// }) => (
//   <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-700 border border-violet-200 rounded-full px-2.5 py-1 text-[11px] font-medium dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800">
//     {label}
//     <button
//       onClick={onRemove}
//       className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity"
//       aria-label={`Remove ${label} filter`}
//     >
//       <X size={10} />
//     </button>
//   </span>
// );

// // ======================
// // MAIN COMPONENT
// // ======================

// const InventoryFilterBar = ({
//   search,
//   onSearchChange,
//   statusFilters,
//   onToggleStatus,
//   categoryFilters,
//   categories,
//   onToggleCategory,
//   stockFilter,
//   onToggleStock,
//   onRemoveFilter,
//   onClearAll,
//   inventory,
// }: InventoryFilterBarProps) => {

//   // Count helpers
//   const statusCount = (val: string) =>
//     inventory.filter((i) => i.product?.status === val).length;

//   const stockCount = (val: string) =>
//     val === "low"
//       ? inventory.filter((i) => i.quantity <= i.alertQuantity && i.quantity > 0).length
//       : inventory.filter((i) => i.quantity > i.alertQuantity).length;

//   // Build active tag list
//   const activeTags: { label: string; group: "status" | "category" | "stock"; val: string }[] = [
//     ...[...statusFilters].map((val) => ({
//       label: STATUS_OPTIONS.find((s) => s.value === val)?.label || val,
//       group: "status" as const,
//       val,
//     })),
//     ...[...categoryFilters].map((val) => ({
//       label: categories.find((c) => c.id === val)?.name || val,
//       group: "category" as const,
//       val,
//     })),
//     ...[...stockFilter].map((val) => ({
//       label: STOCK_OPTIONS.find((s) => s.value === val)?.label || val,
//       group: "stock" as const,
//       val,
//     })),
//   ];

//   const hasActiveFilters = activeTags.length > 0 || search.trim().length > 0;

//   return (
//     <div className="border-b">

//       {/* ======== ROW 1: Search + Status + Stock ======== */}

//       <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-5 py-3.5">

//         {/* SEARCH */}

//         <div className="relative w-full max-w-xs">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
//           <Input
//             value={search}
//             onChange={(e) => onSearchChange(e.target.value)}
//             placeholder="Search name, SKU…"
//             className="pl-8 h-8 rounded-full text-sm bg-muted/40 border-border/60 focus-visible:bg-background"
//           />
//         </div>

//         <div className="h-5 w-px bg-border hidden sm:block" />

//         {/* STATUS LABEL + CHIPS */}

//         <div className="flex items-center gap-2 flex-wrap">
//           <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
//             Status
//           </span>
//           {STATUS_OPTIONS.map((s) => {
//             const count = statusCount(s.value);
//             return (
//               <FilterChip
//                 key={s.value}
//                 active={statusFilters.has(s.value)}
//                 activeClass={s.activeClass}
//                 onClick={() => onToggleStatus(s.value)}
//               >
//                 <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", s.dotClass)} />
//                 {s.label}
//                 {count > 0 && (
//                   <span className="opacity-60 text-[10px]">{count}</span>
//                 )}
//               </FilterChip>
//             );
//           })}
//         </div>

//         <div className="h-5 w-px bg-border hidden sm:block" />

//         {/* STOCK CHIPS */}

//         <div className="flex items-center gap-2 flex-wrap">
//           <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
//             Stock
//           </span>
//           {STOCK_OPTIONS.map((s) => {
//             const count = stockCount(s.value);
//             const Icon = s.icon;
//             return (
//               <FilterChip
//                 key={s.value}
//                 active={stockFilter.has(s.value)}
//                 activeClass={s.activeClass}
//                 onClick={() => onToggleStock(s.value)}
//               >
//                 <Icon size={11} className="flex-shrink-0" />
//                 {s.label}
//                 {count > 0 && (
//                   <span className="opacity-60 text-[10px]">{count}</span>
//                 )}
//               </FilterChip>
//             );
//           })}
//         </div>

//       </div>

//       {/* ======== ROW 2: Category + Active Tags ======== */}

//       <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 pb-3.5">

//         {/* CATEGORY CHIPS */}

//         <div className="flex items-center gap-2 flex-wrap">
//           <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
//             Category
//           </span>
//           {categories.map((cat) => {
//             const Icon = CATEGORY_ICONS[cat.name] || Tag;
//             return (
//               <FilterChip
//                 key={cat.id}
//                 active={categoryFilters.has(cat.id)}
//                 activeClass="bg-violet-700 text-white border-violet-700 hover:bg-violet-700"
//                 onClick={() => onToggleCategory(cat.id)}
//               >
//                 <Icon size={11} className="flex-shrink-0" />
//                 {cat.name}
//               </FilterChip>
//             );
//           })}
//         </div>

//         {/* ACTIVE FILTER TAGS */}

//         {hasActiveFilters && (
//           <div className="flex items-center gap-2 flex-wrap ml-auto">
//             {search.trim() && (
//               <ActiveTag
//                 label={`"${search}"`}
//                 onRemove={() => onSearchChange("")}
//               />
//             )}
//             {activeTags.map((tag) => (
//               <ActiveTag
//                 key={`${tag.group}-${tag.val}`}
//                 label={tag.label}
//                 onRemove={() => onRemoveFilter(tag.group, tag.val)}
//               />
//             ))}
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={onClearAll}
//               className="h-6 px-2 text-[11px] text-muted-foreground hover:text-foreground"
//             >
//               Clear all
//             </Button>
//           </div>
//         )}

//       </div>

//     </div>
//   );
// };

// export default InventoryFilterBar;
