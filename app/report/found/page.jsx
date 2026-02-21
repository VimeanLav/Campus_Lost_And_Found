

"use client";
import { useState, useEffect } from "react";

export default function RequestedFoundItem() {
	const [items, setItems] = useState([]);
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("");
	const [loading, setLoading] = useState(false);

	const fetchItems = async () => {
		setLoading(true);
		let url = "/api/report/found";
		let params = [];
		if (search) params.push(`search=${encodeURIComponent(search)}`);
		if (category) params.push(`category=${encodeURIComponent(category)}`);
		if (params.length) url += `?${params.join("&")}`;
		try {
			const res = await fetch(url);
			const data = await res.json();
			setItems(data);
		} catch {
			setItems([]);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchItems();
		// eslint-disable-next-line
	}, []);

	const handleSearch = (e) => {
		e.preventDefault();
		fetchItems();
	};

	return (
		<div className="px-10 py-12">
			<form className="mb-6 flex gap-4" onSubmit={handleSearch}>
				<input
					type="text"
					placeholder="Search by item name"
					value={search}
					onChange={e => setSearch(e.target.value)}
					className="border rounded px-3 py-2 flex-1"
				/>
				<select
					value={category}
					onChange={e => setCategory(e.target.value)}
					className="border rounded px-3 py-2 flex-1"
				>
					<option value="">All Categories</option>
					<option value="Electronics">Electronics</option>
					<option value="Books">Books</option>
					<option value="Clothing">Clothing</option>
					<option value="Accessories">Accessories</option>
					<option value="Stationery">Stationery</option>
					<option value="Others">Others</option>
				</select>
				<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center" aria-label="Search">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
					</svg>
					Search
				</button>
			</form>
			{loading ? (
				<div className="min-h-[40vh] flex items-center justify-center">Loading...</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
					{items.length === 0 ? (
						<div className="col-span-3 text-center text-gray-500">No items found.</div>
					) : (
						items.map(item => (
							<div key={item._id} className="block text-center border rounded-lg p-4 shadow">
								<img src={item.imageUrl || "/watch.png"} alt="item" className="w-full h-[200px] object-contain mx-auto" />
								<b>{item.title}</b>
								<div className="text-sm text-gray-600 mt-2">{item.category}</div>
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
}

