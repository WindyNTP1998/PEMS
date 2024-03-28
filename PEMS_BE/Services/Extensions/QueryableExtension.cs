using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace Services.Extensions;

public static class QueryableExtension
{
    /// <summary>
    ///     Filters a sequence of values based on a predicate if the condition is true.
    /// </summary>
    /// <typeparam name="T">The type of the elements of source.</typeparam>
    /// <param name="query">An <see cref="IQueryable{T}" /> to filter.</param>
    /// <param name="if">A boolean value representing the condition.</param>
    /// <param name="predicate">A function to test each element for a condition.</param>
    /// <returns>An <see cref="IQueryable{T}" /> that contains elements from the input sequence that satisfy the condition.</returns>
    public static IQueryable<T> WhereIf<T>(this IQueryable<T> query, bool @if, Expression<Func<T, bool>> predicate)
    {
        return @if
            ? query.Where(predicate)
            : query;
    }

    public static IQueryable<T> WhereIf<T>(this IQueryable<T> query, bool @if,
        Func<Expression<Func<T, bool>>> predicateBuilder)
    {
        return @if
            ? query.Where(predicateBuilder())
            : query;
    }

    /// <summary>
    ///     Orders the elements of a sequence in ascending or descending order according to a key.
    /// </summary>
    /// <typeparam name="T">The type of the elements of <paramref name="query" />.</typeparam>
    /// <param name="query">A sequence of values to order.</param>
    /// <param name="keySelector">A function to extract a key from an element.</param>
    /// <param name="orderDirection">The direction of the order (ascending or descending).</param>
    /// <returns>An <see cref="IOrderedQueryable{T}" /> whose elements are sorted according to a key.</returns>
    public static IOrderedQueryable<T> OrderBy<T>(
        this IQueryable<T> query,
        Expression<Func<T, object>> keySelector,
        QueryOrderDirection orderDirection)
    {
        return orderDirection == QueryOrderDirection.Desc
            ? query.OrderByDescending(keySelector)
            : query.OrderBy(keySelector);
    }

    /// <summary>
    ///     Orders the elements of a sequence in ascending or descending order according to a property name.
    /// </summary>
    /// <typeparam name="T">The type of the elements of <paramref name="query" />.</typeparam>
    /// <param name="query">A sequence of values to order.</param>
    /// <param name="propertyName">The name of the property to order the elements by.</param>
    /// <param name="orderDirection">The direction of the order (ascending or descending).</param>
    /// <returns>An <see cref="IOrderedQueryable{T}" /> whose elements are sorted according to a property.</returns>
    public static IOrderedQueryable<T> OrderBy<T>(
        this IQueryable<T> query,
        string propertyName,
        QueryOrderDirection orderDirection = QueryOrderDirection.Asc)
    {
        return orderDirection == QueryOrderDirection.Desc
            ? query.OrderByDescending(GetSortExpression<T>(propertyName))
            : query.OrderBy(GetSortExpression<T>(propertyName));
    }

    public static IQueryable<T> PageBy<T>(this IQueryable<T> query, int? skipCount, int? maxResultCount)
    {
        return query
            .PipeIf(skipCount >= 0, _ => _.Skip(skipCount!.Value))
            .PipeIf(maxResultCount >= 0, _ => _.Take(maxResultCount!.Value));
    }

    /// <summary>
    ///     Generates a sorting expression based on the property name for the given type.
    /// </summary>
    /// <typeparam name="T">The type of the elements of source.</typeparam>
    /// <param name="propertyName">The name of the property to sort by.</param>
    /// <returns>An expression that represents the sorting operation for the specified property.</returns>
    public static Expression<Func<T, object>> GetSortExpression<T>(string propertyName)
    {
        var item = Expression.Parameter(typeof(T));
        var prop = Expression.Convert(Expression.Property(item, propertyName), typeof(object));
        var selector = Expression.Lambda<Func<T, object>>(prop, item);

        return selector;
    }

    public static IQueryable<T> IncludeIf<T, TProperty>(
        this IQueryable<T> query,
        bool @if,
        Expression<Func<T, TProperty>> navigationPropertyPath) where T : class
    {
        return @if
            ? EntityFrameworkQueryableExtensions.Include(query, navigationPropertyPath)
            : query;
    }

    public static IQueryable<T> Include<T, TProperty>(
        this IQueryable<T> query,
        Expression<Func<T, TProperty>> navigationPropertyPath) where T : class
    {
        return EntityFrameworkQueryableExtensions.Include(query, navigationPropertyPath);
    }

    public static IQueryable<T> IncludeIf<T, TProperty, TProperty2>(
        this IQueryable<T> query,
        bool @if,
        Expression<Func<T, TProperty>> navigationPropertyPath,
        Expression<Func<TProperty, TProperty2>> thenIncludeExpression = null) where T : class
    {
        if (@if)
        {
            query = EntityFrameworkQueryableExtensions.Include(query, navigationPropertyPath);
            if (thenIncludeExpression != null)
                query = ((IIncludableQueryable<T, TProperty>)query).ThenInclude(thenIncludeExpression);
        }

        return query;
    }

    public static IQueryable<T> Include<T, TProperty, TProperty2>(
        this IQueryable<T> query,
        Expression<Func<T, TProperty>> navigationPropertyPath,
        Expression<Func<TProperty, TProperty2>> thenIncludeExpression = null) where T : class
    {
        query = EntityFrameworkQueryableExtensions.Include(query, navigationPropertyPath);
        if (thenIncludeExpression != null)
            query = ((IIncludableQueryable<T, TProperty>)query).ThenInclude(thenIncludeExpression);


        return query;
    }

    public static IQueryable<T> IncludeIf<T, TProperty>(
        this IQueryable<T> query,
        bool @if,
        Expression<Func<T, IEnumerable<TProperty>>> navigationPropertyPath,
        Expression<Func<TProperty, object>> thenIncludeExpression = null) where T : class
    {
        if (@if)
        {
            query = EntityFrameworkQueryableExtensions.Include(query, navigationPropertyPath);
            if (thenIncludeExpression != null)
                query = EntityFrameworkQueryableExtensions.Include(query, navigationPropertyPath)
                    .ThenInclude(thenIncludeExpression);
        }

        return query;
    }

    public static IQueryable<T> Include<T, TProperty>(
        this IQueryable<T> query,
        Expression<Func<T, IEnumerable<TProperty>>> navigationPropertyPath,
        Expression<Func<TProperty, object>> thenIncludeExpression = null) where T : class
    {
        query = EntityFrameworkQueryableExtensions.Include(query, navigationPropertyPath);
        if (thenIncludeExpression != null)
            query = EntityFrameworkQueryableExtensions.Include(query, navigationPropertyPath)
                .ThenInclude(thenIncludeExpression);


        return query;
    }
}

public enum QueryOrderDirection
{
    Asc,
    Desc
}