namespace Services.Extensions;

public static class ListExtension
{
	/// <summary>
	/// Executes an asynchronous action for each item in the list.
	/// </summary>
	/// <typeparam name="T">The type of the items in the list.</typeparam>
	/// <param name="items">The list of items to perform the action on.</param>
	/// <param name="action">The asynchronous action to perform on each item. The action takes two parameters: the item and its index in the list.</param>
	/// <returns>A Task representing the asynchronous operation.</returns>
	/// <example>
	///     <code>
	/// await list.ForEachAsync((item, itemIndex) => do some thing async)
	/// </code>
	/// </example>
	public static void CloneForEach<T>(this IEnumerable<T> items, Action<T> action)
	{
		items.ToList().ForEach((item, index) => action(item));
	}

	/// <inheritdoc cref="ForEach{T}(IEnumerable{T},Action{T,int})" />
	public static void ForEach<T>(this IList<T> items, Action<T> action)
	{
		items.ForEach((item, index) => action(item));
	}

	/// <inheritdoc cref="ForEachAsync{T}(IEnumerable{T},Func{T,int,Task})" />
	public static Task ForEachAsync<T>(this IEnumerable<T> items, Func<T, Task> action)
	{
		return items.ForEachAsync((item, index) => action(item));
	}

	/// <inheritdoc cref="ForEachAsync{T}(IEnumerable{T},Func{T,int,Task})" />
	public static Task ForEachAsync<T, TActionResult>(this IEnumerable<T> items, Func<T, Task<TActionResult>> action)
	{
		return items.ForEachAsync((item, index) => action(item));
	}

	/// <summary>
	/// Executes a specified action on each item in the provided collection, along with the index of the item in the collection.
	/// </summary>
	/// <typeparam name="T">The type of the items in the collection.</typeparam>
	/// <param name="items">The collection on which to perform the action.</param>
	/// <param name="action">The action to perform on each item in the collection. This action includes the item itself and its index in the collection.</param>
	/// <example>
	/// This sample shows how to call the ForEach method.
	/// <code>
	/// list.ForEach((item, itemIndex) => Console.WriteLine($"Item: {item}, Index: {itemIndex}"));
	/// </code>
	/// </example>
	public static void ForEach<T>(this IEnumerable<T> items, Action<T, int> action)
	{
		var itemsList = items.As<IList<T>>() ?? items.ToList();

		for (var i = 0; i < itemsList.Count; i++) action(itemsList[i], i);
	}

	/// <summary>
	/// Executes a specified action on each item in the provided list, along with the index of the item in the list.
	/// </summary>
	/// <typeparam name="T">The type of the items in the list.</typeparam>
	/// <param name="items">The list on which to perform the action.</param>
	/// <param name="action">The action to perform on each item in the list. This action includes the item itself and its index in the list.</param>
	/// <example>
	/// This sample shows how to call the ForEach method.
	/// <code>
	/// list.ForEach((item, itemIndex) => Console.WriteLine($"Item: {item}, Index: {itemIndex}"));
	/// </code>
	/// </example>
	public static void ForEach<T>(this IList<T> items, Action<T, int> action)
	{
		for (var i = 0; i < items.Count; i++) action(items[i], i);
	}

	/// <summary>
	/// Asynchronously performs the specified action on each element of the <see cref="IEnumerable{T}" />.
	/// </summary>
	/// <typeparam name="T">The type of the elements of source.</typeparam>
	/// <param name="items">The <see cref="IEnumerable{T}" /> on which to perform the action.</param>
	/// <param name="action">The <see cref="Func{T, int, Task}" /> delegate to perform on each element of the <see cref="IEnumerable{T}" />.</param>
	/// <returns>A <see cref="Task" /> that represents the asynchronous operation.</returns>
	/// <example>
	/// This sample shows how to call the <see cref="ForEachAsync{T}" /> method.
	/// <code>
	/// await list.ForEachAsync((item, itemIndex) => do some thing async)
	/// </code>
	/// </example>
	public static async Task ForEachAsync<T>(this IEnumerable<T> items, Func<T, int, Task> action)
	{
		var itemsList = items.As<IList<T>>() ?? items.ToList();

		for (var i = 0; i < itemsList.Count; i++) await action(itemsList[i], i);
	}
}