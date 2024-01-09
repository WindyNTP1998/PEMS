﻿namespace Services.Entities;

public abstract class BaseEntity<T>
{
    public virtual T Id { get; protected set; }
}