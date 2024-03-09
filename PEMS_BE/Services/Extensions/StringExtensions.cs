using System.Diagnostics.CodeAnalysis;

namespace Services.Extensions;

public static class StringExtensions
{
    public static bool IsNotNullOrEmpty([NotNullWhen(true)] this string? strValue)
    {
        return !string.IsNullOrEmpty(strValue);
    }

    public static bool IsNotNullOrWhiteSpace([NotNullWhen(true)] this string? strValue)
    {
        return !string.IsNullOrWhiteSpace(strValue);
    }

    public static bool IsNullOrEmpty(this string? strValue)
    {
        return string.IsNullOrEmpty(strValue);
    }

    public static bool IsNullOrWhiteSpace(this string? strValue)
    {
        return string.IsNullOrWhiteSpace(strValue);
    }
}