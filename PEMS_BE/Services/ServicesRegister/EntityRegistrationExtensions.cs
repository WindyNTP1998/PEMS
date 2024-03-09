using System.Reflection;

namespace Services.ServicesRegister;

public static class EntityRegistrationExtensions
{
    public static void RegisterEntities<TBase>(this IServiceCollection services, Assembly assembly)
    {
        var baseType = typeof(TBase);
        var entityTypes = assembly.GetTypes()
            .Where(t => baseType.IsAssignableFrom(t) && t != baseType && !t.IsAbstract);

        foreach (var entityType in entityTypes) services.AddScoped(entityType);
    }
}