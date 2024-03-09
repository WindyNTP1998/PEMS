using System.Runtime.CompilerServices;

namespace Services.Extensions;

public static class TaskExtension
{
	/// <summary>
	/// Transforms the result of a task using a provided function.
	/// </summary>
	/// <typeparam name="T">The type of the result produced by the task.</typeparam>
	/// <typeparam name="TR">The type of the result produced by the function.</typeparam>
	/// <param name="task">The task to be transformed.</param>
	/// <param name="f">The function to apply to the result of the task.</param>
	/// <returns>A task that represents the transformed result.</returns>
	/// <remarks>
	/// This method allows for chaining of asynchronous operations without the need for nested callbacks or explicit continuation tasks.
	/// </remarks>
	public static async Task<TR> Then<T, TR>(
		this Task<T> task,
		Func<T, TR> f)
	{
		return f(await task);
	}

	/// <summary>
	/// Executes a function on the result of a Task once it has completed.
	/// </summary>
	/// <typeparam name="T">The type of the result of the Task.</typeparam>
	/// <param name="task">The Task to execute the function on.</param>
	/// <param name="f">The function to execute on the Task's result.</param>
	/// <returns>A Task representing the asynchronous operation.</returns>
	public static async Task Then<T>(
		this Task<T> task,
		Func<T, Task> f)
	{
		await f(await task);
	}

	/// <summary>
	/// </summary>
	/// <typeparam name="TR">The type of the result of the function.</typeparam>
	/// <param name="task">The original task.</param>
	/// <param name="f">A function that transforms the result of the original task into a new result.</param>
	/// <returns>A new task that represents the transformation of the original task by the function.</returns>
	public static async Task<TR> Then<TR>(
		this Task task,
		Func<TR> f)
	{
		await task;
		return f();
	}

	/// <summary>
	/// Executes the provided action after the completion of the given task.
	/// </summary>
	/// <param name="task">The task to await.</param>
	/// <param name="f">The action to execute after the task completes.</param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	public static async Task ThenAction(
		this Task task,
		Action f)
	{
		await task;
		f();
	}

	/// <summary>
	/// Asynchronously waits for the task to complete, and then executes the provided function.
	/// </summary>
	/// <param name="task">The task to await.</param>
	/// <param name="f">The function to execute after the task completes.</param>
	/// <returns>A Task representing the asynchronous operation.</returns>
	public static async Task ThenAction(
		this Task task,
		Func<Task> f)
	{
		await task;
		await f();
	}

	/// <summary>
	/// Transforms the result of a task with a specified function after the task has completed.
	/// </summary>
	/// <typeparam name="T">The type of the result produced by the antecedent <see cref="Task{TResult}" />.</typeparam>
	/// <typeparam name="TR">The type of the result produced by the transformation function.</typeparam>
	/// <param name="task">The task to await.</param>
	/// <param name="nextTask">A function to apply to the result of the task when it completes.</param>
	/// <returns>A new task that will complete with the result of the function.</returns>
	/// <remarks>
	/// This method allows you to easily chain asynchronous operations without having to nest callbacks.
	/// It is based on the idea of "continuations" in functional programming.
	/// </remarks>
	/// <example>
	///     <code>
	/// var task = GetSomeTask();
	/// var transformedTask = task.Then(result => TransformResult(result));
	/// </code>
	/// </example>
	public static async Task<TR> Then<T, TR>(
		this Task<T> task,
		Func<T, Task<TR>> nextTask)
	{
		var taskResult = await task;
		return await nextTask(taskResult);
	}

	public static async Task<TR> Then<T1, T2, TR>(
		this Task<ValueTuple<T1, T2>> task,
		Func<T1, T2, Task<TR>> nextTask)
	{
		var taskResult = await task;
		return await nextTask(taskResult.Item1, taskResult.Item2);
	}

	public static async Task<TR> Then<T1, T2, T3, TR>(
		this Task<ValueTuple<T1, T2, T3>> task,
		Func<T1, T2, T3, Task<TR>> nextTask)
	{
		var taskResult = await task;
		return await nextTask(taskResult.Item1, taskResult.Item2, taskResult.Item3);
	}

	public static async Task<TR> Then<T1, T2, T3, T4, TR>(
		this Task<ValueTuple<T1, T2, T3, T4>> task,
		Func<T1, T2, T3, T4, Task<TR>> nextTask)
	{
		var taskResult = await task;
		return await nextTask(taskResult.Item1, taskResult.Item2, taskResult.Item3, taskResult.Item4);
	}

	public static async Task<TR> Then<T1, T2, T3, T4, T5, TR>(
		this Task<ValueTuple<T1, T2, T3, T4, T5>> task,
		Func<T1, T2, T3, T4, T5, Task<TR>> nextTask)
	{
		var taskResult = await task;
		return await nextTask(taskResult.Item1,
			taskResult.Item2,
			taskResult.Item3,
			taskResult.Item4,
			taskResult.Item5);
	}

	public static async Task<T> ThenAction<T>(
		this Task<T> task,
		Action<T> action)
	{
		var targetValue = await task;

		action(targetValue);

		return targetValue;
	}

	public static TaskAwaiter<(T1, T2)> GetAwaiter<T1, T2>(this (Task<T1>, Task<T2>) tasksTuple)
	{
		return CombineTasks().GetAwaiter();

		async Task<(T1, T2)> CombineTasks()
		{
			await Task.WhenAll(tasksTuple.Item1, tasksTuple.Item2);

			return (tasksTuple.Item1.Result, tasksTuple.Item2.Result);
		}
	}

	public static TaskAwaiter<(T1, T2, T3)> GetAwaiter<T1, T2, T3>(this (Task<T1>, Task<T2>, Task<T3>) tasksTuple)
	{
		return CombineTasks().GetAwaiter();

		async Task<(T1, T2, T3)> CombineTasks()
		{
			await Task.WhenAll(tasksTuple.Item1, tasksTuple.Item2, tasksTuple.Item3);

			return (tasksTuple.Item1.Result, tasksTuple.Item2.Result, tasksTuple.Item3.Result);
		}
	}
}