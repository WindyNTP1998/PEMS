namespace Services.Extensions;

public static class ObjectGeneralExtension
{
	/// <summary>
	/// Casts the given object to the specified type.
	/// </summary>
	/// <typeparam name="T">The type to cast the object to.</typeparam>
	/// <param name="obj">The object to cast.</param>
	/// <returns>The object cast to the specified type, or null if the cast is not possible.</returns>
	public static T As<T>(this object obj) where T : class
	{
		return obj as T;
	}
}